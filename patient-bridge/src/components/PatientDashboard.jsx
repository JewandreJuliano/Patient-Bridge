import React, { useState } from 'react';
import '../styles/PatientDashboard.css'; // Import the CSS file for styling
import PrescriptionPopup from './PrescriptionPopup';


const PatientDashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-actions">
          <button className="prescriptions-button" onClick={openPopup}>
            Prescriptions
          </button>
          <div className="settings-dropdown">
            <button className="settings-button">Settings</button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <h1>Welcome, {"{username}"}</h1>
        <div className='search-container'>
        <input type="text" className="search-bar" placeholder="Search by Condition or Area" />
        <span className="search-icon">&#128269;</span>
        </div>
        <div className='sections-header'><h2>Let Us Guide You to the Right Specialist!</h2></div>

        <div className="sections">
          <div className="section">
            <div className="section-item">
              <img src="/assets/teeth.jpg" alt="Section 1" className="section-image" />
            </div>
            <h2>See a Dentist when...</h2>
            <div className='description'>
              <p>You have a toothache or gum pain</p>
            </div>
          </div>
          <div className="section">
            <div className="section-item">
              <img src="/assets/stress.jpg" alt="Section 2" className="section-image" />
            </div>
            <h2>See a Psychologist when...</h2>
            <div className='description'>
              <p>You feel overwhelmed, anxious, or depressed.</p>
            </div>
          </div>
          <div className="section">
            <div className="section-item">
              <img src="/assets/flu.jpg" alt="Section 3" className="section-image" />
              <h2>See a General Practitioner when...</h2>
              <div className='description'>
                <p>You have a fever, cold, or flu symptoms, or just need a general health check up.</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-item">
              <img src="/assets/eye.jpg" alt="Section 4" className="section-image" />
            </div>
            <h2>See an Optometrist when...</h2>
            <div className='description'>
              <p>You have blurred or double vision, or are experiencing eye strain or headaches.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                </div>
            </footer>

      {/* Prescription Popup */}
      <PrescriptionPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default PatientDashboard;
