import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorSignUpPage.css'; // Import CSS file for styling
import LoginPage from './LoginPage';

const DoctorSignUpPage = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isDoctorSignUpOpen, setIsDoctorSignUpOpen] = useState(false);
    const [formData, setFormData] = useState({
        practiceName: '',
        practiceAddress: '',
        suburb: '',
        city: '',
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

    const handleOpenLogin = () => {
        setIsDoctorSignUpOpen(false);
        setIsLoginOpen(true);
    };
    const handleCloseLogin = () => {
        setIsLoginOpen(false);
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
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('Doctor registered successfully');
            handleOpenLogin();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error creating doctor account');
        });
    };

    return (
        isOpen && (
            <div className="doctor-popup-container">
                <div className="doctor-popup-content">
                <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
  X
</button>
                    <p className="login-title">SIGN UP AS DOCTOR</p>
                    <p className='sign-in-message'>Welcome! Sign Up below to get your journey started!</p>
                    <form className="doctor-signup-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="doctor-form-group">
                                <label htmlFor="practiceName">PRACTICE NAME</label>
                                <input
                                    type="text"
                                    id="practiceName"
                                    name="practiceName"
                                    value={formData.practiceName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="doctor-form-group">
                                <label htmlFor="practiceAddress">PRACTICE ADDRESS</label>
                                <input
                                    type="text"
                                    id="practiceAddress"
                                    name="practiceAddress"
                                    value={formData.practiceAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="doctor-form-group">
                                <label htmlFor="suburb">SUBURB</label>
                                <input
                                    type="text"
                                    id="suburb"
                                    name="suburb"
                                    value={formData.suburb}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="doctor-form-group">
                                <label htmlFor="city">CITY</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="doctor-form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="doctor-form-group">
                                <label htmlFor="phoneNumber">PHONE NUMBER</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="doctor-form-group">
                                <label htmlFor="specialty">SPECIALTY</label>
                                <input
                                    type="text"
                                    id="specialty"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="doctor-form-group">
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
                            <div className="doctor-form-group">
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
                        <p>Already have an account? <a href="#" onClick={handleOpenLogin}>Log in here</a></p>
                        {isLoginOpen && (
                <LoginPage isOpen={isLoginOpen} onClose={handleCloseLogin} />
            )}

             {
                
            }

                    </form>
                </div>
            </div>
        )
    );
};

export default DoctorSignUpPage;
