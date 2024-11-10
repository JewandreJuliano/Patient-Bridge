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
                    <a href="/help-page">Help</a>
                    <a href="/about-us">About Us</a>
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
                    <h1 className='landing-head'><span>Your Health,</span><br />In Your Hands</h1>
                    <p>
                    Patient Bridge simplifies healthcare by making it easy to book appointments with trusted providers.
                    Whether managing regular check-ups or urgent consultations,
                    our platform helps you connect with the right care at the right time
                    </p>
                </div>
                <div className="image">
                    <span className="image__bg"></span>
                    <img src="assets/doctor-overlay.png" alt="header" className='profile-image' />
                </div>
                <div className="image__content image__content__1">
                    <div className="details">
                        <p>Easy Appointment Booking</p>
                    </div>
                </div>
                <div className="image__content image__content__2">
                    <p>Simple Medication Tracking</p>
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
                            <p>Securely locate your doctors on our app.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/trackmedication.jpg" alt="Medication Tracking" className="benefit-icon" loading="lazy" />
                            <h3>Medication Tracking</h3>
                            <p>Track and manage your medications with ease.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/emergency.jpg" alt="Emergency Responses" className="benefit-icon" loading="lazy" />
                            <h3>Emergency Contacts</h3>
                            <p>Add your emergency contacts and access them on our app</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
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
