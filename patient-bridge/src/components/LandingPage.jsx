import React, { useState } from 'react';
import '../styles/LandingPage.css'; 
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="landing-page">
            <header className="header sticky-header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">Patient Bridge</h1>
                </div>
                <div className="auth-buttons">
                    <a href='/'>Help</a>
                    <a href = '/login' className='login-btn'>Login</a>
                    <div className="signup-dropdown">
                        <button className="signup-btn" onClick={handleDropdownToggle}>Sign Up</button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <a href="/signup/patient" className="dropdown-item">Sign Up as Patient</a>
                                <a href="/signup/doctor" className="dropdown-item">Sign Up as Doctor/Practice</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            
            <div className="background-image-container">
                <img src="/assets/bgroundimage.png" alt="Medical Icons Background" className="background-image" />
            </div>

            
            <div className="hero-section">
                <h2 className="hero-tagline">Your Health, in Your Hands</h2>
                <p className="hero-description">
                    Welcome to Patient Bridge, your go-to platform for seamless healthcare management.
                    Our app offers an intuitive and user-friendly experience to help you manage appointments,
                    communicate with your healthcare providers, and track your medication efficiently.
                    Start exploring our features today and take control of your health journey!
                </p>
                
                <a href="/explore" className="cta-button">Get Started</a>
            </div>

            
            <main className="main-content">
                <section className="benefits">
                    <h2>Why Use Patient Bridge?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <img src="/assets/calender.jpg" alt="Easy Appointment Scheduling" className="benefit-icon" loading="lazy" />
                            <h3>Easy Appointment Scheduling</h3>
                            <p>Book appointments quickly and easily, with real-time updates.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/location.jpg" alt="Locate Available Doctors" className="benefit-icon" loading="lazy" />
                            <h3>Locate Available Doctors</h3>
                            <p>Communicate securely with your doctors from anywhere.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/trackmedication.jpg" alt="Medication Tracking" className="benefit-icon" loading="lazy" />
                            <h3>Medication Tracking</h3>
                            <p>Track and manage your medications with ease.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/emergency.jpg" alt="Emergency Responses" className="benefit-icon" loading="lazy" />
                            <h3>Emergency Responses</h3>
                            <p>Contact emergency lines directly.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
