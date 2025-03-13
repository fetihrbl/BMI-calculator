import React, { useState } from 'react';
import './BmiCalculator.css';

const BmiCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');
    const [history, setHistory] = useState([]);

    const calculateBMI = () => {
        const weightValue = parseFloat(weight);
        const heightValue = parseFloat(height) / 100;

        if (!weight || !height || weightValue <= 0 || heightValue <= 0) {
            alert('Please enter valid weight and height!');
            return;
        }

        const bmiValue = (weightValue / (heightValue * heightValue)).toFixed(2);
        setBmi(bmiValue);

        let bmiStatus = '';
        if (bmiValue < 18.5) {
            bmiStatus = 'Underweight';
        } else if (bmiValue < 24.9) {  // EKLENDİ
            bmiStatus = 'Normal weight';
        } else if (bmiValue < 29.9) {
            bmiStatus = 'Overweight';
        } else {
            bmiStatus = 'Obesity';
        }

        setStatus(bmiStatus);

        setHistory([...history, { bmi: bmiValue, status: bmiStatus, id: Date.now() }]);
    };

    return (
        <div className='container'>
            <h1>BMI Calculator</h1>
            <div className='input-group'>
                <label>Weight (kg):</label>
                <input
                    type='number'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                />
            </div>
            <div className='input-group'>
                <label>Height (cm):</label>
                <input
                    type='number'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter your height"
                />
            </div>
            <button onClick={calculateBMI}>Calculate</button>

            {bmi && (
                <div className='result'>
                    <h3>Your BMI: {bmi}</h3>
                    <h3 className={status.toLowerCase().replace(' ', '-')}>Status: {status}</h3>
                </div>
            )}

            {history.length > 0 && (
                <div className='history'>
                    <h2>History</h2>
                    <ul>
                        {history.map((entry) => (
                            <li key={entry.id}>
                                BMI: <strong>{entry.bmi}</strong> - <span className={entry.status.toLowerCase().replace(' ', '-')}>{entry.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BmiCalculator;
