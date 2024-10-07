import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/DoctorSignUpPage.css'; // Import CSS file for styling

const DoctorSignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        practiceName: '',
        practiceAddress: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        specialty: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send a POST request to the server with the form data
        fetch('http://localhost:5432/api/doctor-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                practiceName: formData.practiceName,
                practiceAddress: formData.practiceAddress,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                specialty: formData.specialty
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('Doctor registered successfully');
            navigate('/login');

            // You might want to navigate or clear the form here
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error creating doctor account');
        });
    };

    return (
        <div className="doctor-signup-page">
            <header className="header">
                <h1 className="title">Doctor/Practice Sign Up</h1>
            </header>
            <main className="main-content">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="practiceName">Practice Name</label>
                        <input
                            type="text"
                            id="practiceName"
                            name="practiceName"
                            value={formData.practiceName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="practiceAddress">Practice Address</label>
                        <input
                            type="text"
                            id="practiceAddress"
                            name="practiceAddress"
                            value={formData.practiceAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty</label>
                        <input
                            type="text"
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
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
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                
            </main>
            <footer className="signup-footer">
                <p>Already have an account? <a href="/login">Log in here</a></p>
            </footer>
            <footer className="footer">
                <p>© 2024 Patient Bridge. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DoctorSignUpPage;
