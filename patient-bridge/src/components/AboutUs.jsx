import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">PATIENT BRIDGE</h1>
                </div>
            </header>
            <div className="aboutus-sidebar">
                <a href="#our-purpose">Our purpose</a>
                <a href="#why-us">Why Choose PatientBridge</a>
                <a href="#our-team">Our Team</a>
                <a href="#forward">Looking Forward</a>
                <a href="#contact">Contact</a>
            </div>

            <main className="aboutus-content">
                <h2>Welcome to PatientBridge</h2>
                <p>
                    At PatientBridge, our mission is to simplify health management by empowering both patients and healthcare 
                    providers with tools to improve communication, manage medication, and schedule appointments with ease. We 
                    believe that health should be accessible and manageable for everyone.
                </p>

                <h3 id = "our-purpose">Our Purpose</h3>
                <h4>Connecting Patients and Providers</h4>
                <p>
                    PatientBridge was designed to bridge the gap between patients and healthcare providers. By enabling seamless 
                    appointment scheduling and medication tracking, we aim to reduce barriers to essential healthcare and improve 
                    the overall experience for patients.
                </p>

                <h4>Streamlined Health Management</h4>
                <p>
                    With PatientBridge, managing health information is simple and centralized. Patients can track their 
                    medications, schedule doctor appointments based on real-time availability, and receive reminders, all from one 
                    secure platform.
                </p>

                <h3 id = "why-us">Why Choose PatientBridge?</h3>
                <ul>
                    <li><strong>User-Friendly:</strong> Our intuitive interface makes it easy for all users, whether tech-savvy or not, to navigate the app’s features.</li>
                    <li><strong>Privacy-Focused:</strong> PatientBridge prioritizes the security of personal health information, using encryption and industry-standard security measures to ensure that data stays private.</li>
                    <li><strong>Reliable Reminders:</strong> Users receive automated reminders for taking medications and attending appointments, helping to reduce missed doses and appointments.</li>
                    <li><strong>Tailored for Both Patients and Providers:</strong> PatientBridge serves both patients who want to manage their health more independently and healthcare providers looking to enhance patient engagement and track medication adherence.</li>
                </ul>

                <h3>Our Team</h3>
                <p>
                    PatientBridge was developed by a dedicated team of professionals passionate about healthcare and technology. 
                    We work continuously to improve the app and add new features that support patient care and provider efficiency.
                </p>

                <h3 id = "forward">Looking Forward</h3>
                <p>
                    As we grow, our goal is to introduce even more features that improve health accessibility and care quality. 
                    Whether it's integrating with more healthcare systems or adding advanced reporting for medication adherence, 
                    we are committed to evolving alongside the needs of our users.
                </p>

                <h3 id = "contact">Contact Us</h3>
                <p>
                    We’d love to hear from you! If you have any questions or suggestions, please reach out to us at:
                </p>
                <ul>
                    <li><strong>Email:</strong> support@patientbridge.com</li>
                    <li><strong>Phone:</strong> 1-800-555-0199</li>
                    <li><strong>Social Media:</strong> Follow us on <a href="#!">Facebook</a>, <a href="#!">Twitter</a>, and <a href="#!">LinkedIn</a></li>
                </ul>

                <p>Thank you for choosing PatientBridge as your health management partner.</p>
            </main>
        </div>
    );
};

export default AboutUs;
