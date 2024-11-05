import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';
import PatientSignUpPage from './PatientSignUpPage';
import DoctorSignUpPage from './DoctorSignUpPage';
import ForgotPassword from './ForgotPassword';

const LoginPage = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // State for handling popups
    const [isDoctorSignUpOpen, setIsDoctorSignUpOpen] = useState(false);
    const [isPatientSignUpOpen, setIsPatientSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const handleOpenDoctorSignUp = () => {
        setIsDoctorSignUpOpen(true);
    };

    const handleCloseDoctorSignUp = () => {
        setIsDoctorSignUpOpen(false);
    };

    const handleOpenPatientSignUp = () => {
        setIsPatientSignUpOpen(true);
    };

    const handleClosePatientSignUp = () => {
        setIsPatientSignUpOpen(false);
    };

    // Open Forgot Password Form
    const handleForgotPasswordClick = () => {
        setIsForgotPasswordOpen(true);
    };

    // Close Forgot Password Form
    const handleCloseForgotPassword = () => {
        setIsForgotPasswordOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
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
                localStorage.setItem('user', JSON.stringify(data.user)); 
    
                if (data.userType === 'patient') {
                    localStorage.setItem('currentPatientId', data.user.patient_id);
                    navigate('/patient-dashboard');
                } else if (data.userType === 'doctor') {
                    localStorage.setItem('doctorId', data.user.doctorId);
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
            {isOpen && !isForgotPasswordOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                    <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
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
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn">LOGIN</button>
                            <span className="forgot-password-link" onClick={handleForgotPasswordClick}> Forgot Password?</span>
                            <div className="login-links">
                                <div>
                                    New on our platform? Sign up as a  
                                    <Link to="#!" className="patient-signup" onClick={handleOpenPatientSignUp}> Patient </Link>
                                    or 
                                    <Link to="#!" className="doctor-signup" onClick={handleOpenDoctorSignUp}> Doctor</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Render Forgot Password Form */}
            {isForgotPasswordOpen && (
                <ForgotPassword isOpen={isForgotPasswordOpen} onClose={handleCloseForgotPassword} />
            )}

            {/* Render Doctor Sign Up Popup */}
            {isDoctorSignUpOpen && (
                <DoctorSignUpPage isOpen={isDoctorSignUpOpen} onClose={handleCloseDoctorSignUp} />
            )}

            {/* Render Patient Sign Up Popup */}
            {isPatientSignUpOpen && (
                <PatientSignUpPage isOpen={isPatientSignUpOpen} onClose={handleClosePatientSignUp} />
            )}
        </>
    );
};

export default LoginPage;
