import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/LandingPage.css'; 
import LoginPage from './LoginPage';  // Import the login popup (previously LoginPopup)

const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login popup
    const navigate = useNavigate(); // Hook to navigate to different routes

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOpenLogin = () => {
        setIsLoginOpen(true); // Open login popup
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false); // Close login popup
    };

    const handlePatientSignUp = () => {
        navigate('/signup/patient'); // Navigate to patient signup page
    };

    const handleDoctorSignUp = () => {
        navigate('/signup/doctor'); // Navigate to doctor signup page
    };

    return (
        <div className="landing-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">PATIENT BRIDGE</h1>
                </div>
                
                <nav className="nav-links">
                    <a href="/">Help</a>
                    <a href="/">About Us</a>
                    <a href="#" onClick={handleOpenLogin}>Login</a> {/* Trigger login popup */}
                    <a href="#" onClick={handleDropdownToggle}>Sign Up</a>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={handlePatientSignUp}>Sign Up as Patient</a>
                            <a className="dropdown-item" onClick={handleDoctorSignUp}>Sign Up as Doctor/Practice</a>
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
                    <img src="assets/doctor-overlay.png" alt="header image" className='profile-image' />
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
                            <p>Communicate securely with your doctors on our app.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/trackmedication.jpg" alt="Medication Tracking" className="benefit-icon" loading="lazy" />
                            <h3>Medication Tracking</h3>
                            <p>Track and manage your medications with ease.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="/assets/emergency.jpg" alt="Emergency Responses" className="benefit-icon" loading="lazy" />
                            <h3>Emergency Responses</h3>
                            <p>Add and access your emergency contacts.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms-of-service">Terms of Service</a>
                        <a href="/contact">Contact Us</a>
                    </div>
                </div>
            </footer>

            {/* Render the login pop-up */}
            <LoginPage isOpen={isLoginOpen} onClose={handleCloseLogin} />
        </div>
    );
};

export default LandingPage;
