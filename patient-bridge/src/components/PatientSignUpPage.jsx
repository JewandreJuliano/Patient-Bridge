import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientSignUpPage.css'; // Import CSS file for styling
import LoginPage from './LoginPage';

const PatientSignUpPage = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send a POST request to the server with the form data
        fetch('http://localhost:5432/api/patient-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('Account created successfully');
            handleOpenLogin();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error creating account');
        });
    };
    const handleOpenLogin = () => {
        setIsLoginOpen(true);
    };
    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    return (
        isOpen && ( // Render the form only if isOpen is true
            <div className="patient-popup-container">
                <div className="patient-popup-content">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <p className="login-title">SIGN UP AS PATIENT</p>
                    <p className='sign-in-message'>Welcome! Sign Up below to get your journey started!</p>

                    <form className="signup-form" onSubmit={handleSubmit}>
    <div className="form-row">
        <div className="patient-form-group">
            <label htmlFor="fullName">FULL NAME</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
            />
        </div>

        <div className="patient-form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <div className="form-row">
        <div className="patient-form-group">
            <label htmlFor="phoneNumber">PHONE NUMBER</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
            />
        </div>

        <div className="patient-form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <div className="form-row">
        <div className="patient-form-group">
            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <button type="submit" className="signup-btn">CREATE ACCOUNT</button>
</form>

{isLoginOpen && (
                <LoginPage isOpen={isLoginOpen} onClose={handleCloseLogin} />
            )}

                    <footer className="signup-footer">
                        <p>Already have an account? <a href="#" onClick={handleOpenLogin}>Log in here</a></p>
                    </footer>
                </div>
            </div>
        )

        
    );
};

export default PatientSignUpPage;
