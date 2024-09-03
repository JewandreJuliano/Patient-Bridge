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
            
            
            <div className="hero-section">
            <h2 className="hero-tagline">Your Health, in Your Hands</h2>
                <p className="hero-description">
                    Take control of your healthcare journey with Patient Bridge. 
                    Manage appointments, communicate with providers, and track your medication all in one place.
                </p>
    
            </div>

            <main className="main-content">
                <section className="benefits">
                    <h2>Why Use Patient Bridge?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <img src="/assets/calender.jpg" alt="Benefit 1" className="benefit-icon" />
                            <h3>Easy Appointment Scheduling</h3>
                            <p>Book appointments quickly and easily, with real-time updates.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/location.jpg" alt="Benefit 2" className="benefit-icon" />
                            <h3>Locate Available Doctors</h3>
                            <p>Communicate securely with your doctors from anywhere.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/trackmedication.jpg" alt="Benefit 3" className="benefit-icon" />
                            <h3>Medication Tracking</h3>
                            <p>Track and manage your medications with ease.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/emergency.jpg" alt="Benefit 4" className="benefit-icon" />
                            <h3>Emergency Responses</h3>
                            <p>Contact emergency lines directly.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                    <nav className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
