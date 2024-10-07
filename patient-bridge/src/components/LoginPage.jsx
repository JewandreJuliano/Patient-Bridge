import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Import CSS file for styling

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                // Navigate to the appropriate dashboard based on user type
                if (data.userType === 'patient') {
                    navigate('/dashboard'); // Change to your patient dashboard route
                } else {
                    navigate('/dashboard'); // Change to your doctor dashboard route
                }
            } else {
                console.error('Login failed:', data.message);
                alert(data.message); // Show error message to the user
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login, please try again.');
        }
    };
    return (
        <div className="login-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">Patient Bridge</h1>
                </div>
            </header>

            <main className="main-content">
                <div className="login-container">
                    <h2 className="login-title">Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                        <div className="login-links">
                            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                            <p>Don't have an account?</p>
                            <p><Link to="/signup/patient" className="dropdown-item">Sign Up as Patient</Link></p>
                            <p>or</p>
                            <p><Link to="/signup/doctor" className="dropdown-item">Sign Up as Doctor/Practice</Link></p>

                        </div>
                    </form>
                </div>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
