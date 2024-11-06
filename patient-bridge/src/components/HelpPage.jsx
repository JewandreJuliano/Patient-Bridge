import React from 'react';
import '../styles/HelpPage.css';

const HelpPage = () => {
    return (
        <div className="help-page">
            <header className="header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">PATIENT BRIDGE</h1>
                    <a href = "/"className='back-to-land'>Back</a>
                </div>
            </header>

            <div className="sidebar">
                <a href="#getting-started">Getting Started</a>
                <a href="#features">Features</a>
                <a href="#faqs">FAQs</a>
                <a href="#troubleshooting">Troubleshooting</a>
                <a href="#contact">Contact Support</a>
            </div>

            <main className="help-content">
                <h2 id="getting-started">Welcome to PatientBridge!</h2>
                <p>
                    PatientBridge is designed to help you manage your health more effectively by tracking medications and booking appointments with your healthcare providers.
                    This help page will guide you through using the app's features and troubleshooting common issues.
                </p>

                <h3>Getting Started</h3>
                <h4>Creating Your Account</h4>

                <h5>For Patients</h5>
                <ol>
                    <li>Visit the PatientBridge Sign-Up Page.</li>
                    <li>Click on <strong>Sign Up</strong> and choose the option to <strong>Sign Up as Patient.</strong></li>
                    <li>Fill in the required information, including your name, email, password, and any other necessary details.</li>
                    <li>Click on the <strong>Sign Up</strong> button.</li>
                    <li>Check your email for a confirmation link and follow the instructions to verify your account.</li>
                </ol>

                <h5>For Doctors/Practices</h5>
                <ol>
                    <li>Visit the PatientBridge Sign-Up Page.</li>
                    <li>Click on <strong>Sign Up</strong> and choose the option <strong>Sign Up as Doctor/Practice.</strong></li>
                    <li>Fill in the required information, including your name, email, password, practice name, and any other necessary details.</li>
                    <li>Click on the <strong>Sign Up</strong> button.</li>
                    <li>Check your email for a confirmation link and follow the instructions to verify your account.</li>
                </ol>

                <h4>Logging In</h4>
                <ol>
                    <li>Navigate to the <strong>Login Page.</strong></li>
                    <li>Enter your registered email and password.</li>
                    <li>Click <strong>Login.</strong></li>
                    <li>If you forget your password, click on <strong>Forgot Password?</strong> and follow the prompts to reset it.</li>
                </ol>

                <h3 id="features">Features and Functionality</h3>
                <h4>Medication Tracking</h4>
                <p><strong>Add a Medication:</strong></p>
                <ol>
                    <li>Go to the <strong>Medications</strong> section.</li>
                    <li>Click on <strong>Add Medication.</strong></li>
                    <li>Enter the medication name, dosage, frequency, and any notes.</li>
                    <li>Click <strong>Save.</strong></li>
                </ol>

                <p><strong>Set Reminders:</strong> Reminders to take medications are automatically set to send 5 minutes before and after the time you set to take your medication.</p>

                <h4>Booking Appointments</h4>
                <p><strong>Find a Doctor:</strong></p>
                <ol>
                    <li>Search for your preferred doctor by name or specialty via the search bar on your patient dashboard.</li>
                </ol>

                <p><strong>Book an Appointment:</strong></p>
                <ol>
                    <li>Select a date and time.</li>
                    <li>Confirm your appointment details and click <strong>Book Appointment.</strong></li>
                </ol>

                <h3 id="faqs">FAQs</h3>
                <p><strong>Q: How do I edit or delete a medication?</strong></p>
                <p>A: Go to the <strong>Medications</strong> section, click on the medication you want to edit or delete, and follow the prompts.</p>

                <p><strong>Q: What if I can't see my appointment?</strong></p>
                <p>A: Make sure you are logged in with the correct account. If the issue persists, please contact support.</p>

                <h3 id="troubleshooting">Troubleshooting Tips</h3>
                <p><strong>Can't Log In?</strong> Ensure your email and password are correct. If you still can’t log in, try resetting your password.</p>
                <p><strong>Not Receiving Reminders?</strong> Check your notification settings in the app and ensure your device allows notifications.</p>

                <h3 id="contact">Contact Support</h3>
                <p>If you need further assistance, please reach out to our support team:</p>
                <p><strong>Email:</strong> support@patientbridge.com</p>
                <p><strong>Phone:</strong> 1-800-555-0199</p>

                <h3>Privacy and Security</h3>
                <p>Your privacy is important to us. PatientBridge uses industry-standard security measures to protect your data. For more details, please read our <a href="#!">Privacy Policy</a>.</p>

                <h3>Feedback</h3>
                <p>We value your input! Please let us know your thoughts and suggestions for improving PatientBridge. <a href="#!">Submit Feedback</a>.</p>

                <h3>Accessibility Features</h3>
                <p>PatientBridge is committed to accessibility. We offer features such as screen reader support and adjustable text sizes to ensure that all users can navigate our app effectively.</p>
            </main>
        </div>
    );
};

export default HelpPage;
