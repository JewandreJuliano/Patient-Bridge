import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientSignUpPage.css'; // Import CSS file for styling

const PatientSignUpPage = () => {
    const navigate = useNavigate();
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
            navigate('/dashboard');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error creating account');
        });
    };

    return (
        <div className="patient-signup-page">
            <header className="signup-header">
                <h1 className="signup-title">Patient Sign Up</h1>
            </header>

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="signup-btn">Create Account</button>
            </form>

            <footer className="signup-footer">
                <p>Already have an account? <a href="/login">Log in here</a></p>
            </footer>
            <footer className="footer">
                <p>© 2024 Patient Bridge. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PatientSignUpPage;
