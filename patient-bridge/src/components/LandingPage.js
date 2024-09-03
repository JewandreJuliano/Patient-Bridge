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
                Welcome to Patient Bridge, your go-to platform for seamless healthcare management.
                Our app offers an intuitive and user-friendly experience to help you manage appointments,
                communicate with your healthcare providers, and track your medication efficiently.
                Start exploring our features today and take control of your health journey!
                </p>
                <a href="#" className="cta-button">Get Started</a>
            </div>

            <main className="main-content">
                <section className="benefits">
                <h3 className="intro-text">You may ask...</h3>
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
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
