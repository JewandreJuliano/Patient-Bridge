// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">Patient Bridge</h1>
                </div>
                <div className="auth-buttons">
                    <button className="help-btn">Help</button>
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Sign Up</button>
                </div>
            </header>
            <main className="main-content">
                <section className="benefits">
                    <h2>Why Use Patient Bridge?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <img src="/assets/icon1.png" alt="Benefit 1" className="benefit-icon" />
                            <h3>Easy Appointment Scheduling</h3>
                            <p>Book appointments quickly and easily, with real-time updates.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/icon2.png" alt="Benefit 2" className="benefit-icon" />
                            <h3>Locate Available Doctors</h3>
                            <p>Communicate securely with your doctors from anywhere.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/icon3.png" alt="Benefit 3" className="benefit-icon" />
                            <h3>Medication Tracking</h3>
                            <p>Track and manage your medications with ease.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/icon4.png" alt="Benefit 4" className="benefit-icon" />
                            <h3>Emergency Responses</h3>
                            <p>Contact emergency lines directly.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p>© 2024 Patient Bridge. All rights reserved.</p>
                <nav className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </nav>
            </footer>
        </div>
    );
};

export default LandingPage;
