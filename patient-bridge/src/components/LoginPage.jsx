import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Keeping your existing styles
import PatientSignUpPage from './PatientSignUpPage';
import DoctorSignUpPage from './DoctorSignUpPage'; // Import DoctorSignUpPage

const LoginPage = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isDoctorSignUpOpen, setIsDoctorSignUpOpen] = useState(false);

    const handleOpenDoctorSignUp = () => {
        setIsDoctorSignUpOpen(true);
    };

    const handleCloseDoctorSignUp = () => {
        setIsDoctorSignUpOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the request body
        const requestBody = { email, password };

        try {
            const response = await fetch('http://localhost:5432/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);

                // Store the user information in localStorage
                localStorage.setItem('user', JSON.stringify(data.user)); 

                // Navigate to the appropriate dashboard based on user type
                if (data.userType === 'patient') {
                    navigate('/patient-dashboard'); 
                } else {
                    navigate('/doctor-dashboard'); 
                }
            } else {
                console.error('Login failed:', data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login, please try again.');
        }
    };

    return (
        <>
            {isOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        <button className="close-btn" onClick={onClose}>
                            X
                        </button>
                        <p className="login-title">WELCOME TO PATIENT BRIDGE</p>
                        <p className='sign-in-message'>Please sign into your account below</p>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">PASSWORD</label>
                                <a href="/forgot-password" className="forgot-password-link"> Forgot Password?</a>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn">LOGIN</button>
                            <div className="login-links">
                                <div>
                                    New on our platform? Sign up as a  
                                    <span className='patient-sign'>
                                        <a href='/signup/patient' className='patient-sign'>  Patient </a>
                                    </span> 
                                     or 
                                    <span className='doctor-sign' onClick={handleOpenDoctorSignUp}> 
                                        <a href="#!" className='doctor-sign'> Doctor</a>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Render Doctor Sign Up Popup */}
            {isDoctorSignUpOpen && (
                <DoctorSignUpPage isOpen={isDoctorSignUpOpen} onClose={handleCloseDoctorSignUp} />
            )}
        </>
    );
};

export default LoginPage;
