import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; 
import LoginPage from './LoginPage';  // Import the login popup (previously LoginPopup)
import PatientSignUpPage from './PatientSignUpPage';
import DoctorSignUpPage from './DoctorSignUpPage'; // Import DoctorSignUpPage


const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login popup
    const [isDoctorSignUpOpen, setIsDoctorSignUpOpen] = useState(false);
    const [isPatientSignUpOpen, setIsPatientSignUpOpen] = useState(false);


    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOpenLogin = () => {
        setIsLoginOpen(true); // Open login popup
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false); // Close login popup
    };

    // Open Doctor Sign Up Popup
    const handleOpenDoctorSignUp = () => {
        setIsDoctorSignUpOpen(true);
    };

    // Close Doctor Sign Up Popup
    const handleCloseDoctorSignUp = () => {
        setIsDoctorSignUpOpen(false);
    };

    // Open Patient Sign Up Popup
    const handleOpenPatientSignUp = () => {
        setIsPatientSignUpOpen(true);
    };

    // Close Patient Sign Up Popup
    const handleClosePatientSignUp = () => {
        setIsPatientSignUpOpen(false);
    };

    return (
        <div className="landing-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">PATIENT BRIDGE</h1>
                </div>
                
                <nav className="nav-links">
                    <Link to="/help">Help</Link>
                    <Link to="/about">About Us</Link>
                    <a href="#!" onClick={handleOpenLogin}>Login</a> {/* Trigger login popup */}
                    <a href="#!" onClick={handleDropdownToggle}>Sign Up</a>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <Link to="#!" className="dropdown-item" onClick={handleOpenPatientSignUp}>Sign Up as Patient</Link>
                            <Link to="#!" className="dropdown-item" onClick={handleOpenDoctorSignUp}>Sign Up as Doctor/Practice</Link>
                        </div>
                    )}
                </nav>
                
            </header>

            <header className="header2">
                <div className="content">
                    <h1><span>Your Health,</span><br />In Your Hands</h1>
                    <p>
                        In today's fast-paced world, access to prompt and efficient medical
                        services is of paramount importance. When faced with a medical
                        emergency or seeking immediate medical attention, the ability to
                        receive quick medical services can significantly impact the outcome
                        of a situation.
                    </p>
                </div>
                <div className="image">
                    <span className="image__bg"></span>
                    <img src="assets/doctor-overlay.png" alt="header" className='profile-image' />
                </div>
                <div className="image__content image__content__1">
                    <div className="details">
                        <p>Friendly Doctors</p>
                    </div>
                </div>
                <div className="image__content image__content__2">
                    <p>Friendly Doctors</p>
                </div>
            </header>

            <main className="main-content">
                <section className="benefits">
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

            {/* Render the login pop-up */}
            <LoginPage isOpen={isLoginOpen} onClose={handleCloseLogin} />
            {/* Render Doctor Sign Up Popup */}
            {isDoctorSignUpOpen && (
                <DoctorSignUpPage isOpen={isDoctorSignUpOpen} onClose={handleCloseDoctorSignUp} />
            )}

            {/* Render Patient Sign Up Popup */}
            {isPatientSignUpOpen && (
                <PatientSignUpPage isOpen={isPatientSignUpOpen} onClose={handleClosePatientSignUp} />
            )}
        </div>
    );
};

export default LandingPage;
