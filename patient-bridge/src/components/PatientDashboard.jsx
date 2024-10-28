import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientDashboard.css';
import PrescriptionPopup from './PrescriptionPopup';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.fullName || storedUser.practiceName || 'User');
      setCurrentPatientId(storedUser.patientId || null);
      fetchMedications(storedUser.patientId); // Fetch medications on login
    }

    fetchDoctors();

    const handleOutsideClick = (event) => {
      if (!event.target.closest('.settings-dropdown')) {
        setShowSettingsDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5432/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMedications = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:5432/api/medications/${patientId}`);
      const data = await response.json();
      // Set the medications in local storage or state as needed
      localStorage.setItem('medications', JSON.stringify(data)); // Save medications to local storage
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const results = doctors.filter(doc =>
      doc.specialty.toLowerCase().includes(query) ||
      doc.practiceAddress.toLowerCase().includes(query)
    );
    setSearchResults(results);

    if (event.target.value === '') {
      setSearchResults([]);
    }
  };

  const handleSettingsDropdownToggle = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const handlePrescriptionsClick = () => {
    setShowPrescriptionPopup(true);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleEmergencyContactClick = () => {
    navigate('/emergency-contact');
  };

  const handleSelectDoctor = (doctor) => {
    navigate('/book-apt', { state: { doctor } });
  };

  const handleTrackMedicationClick = () => {
    navigate('/track-medications');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
        <div className="header-actions">
          <button className="track-button" onClick={handleTrackMedicationClick} aria-label="Track Medication">
            Track Medication
          </button>
          <button className="prescriptions-button" onClick={handlePrescriptionsClick} aria-label="Medications">
            Medications
          </button>
          <div className="settings-dropdown">
            <button className="settings-button" onClick={handleSettingsDropdownToggle} aria-label="Settings">
              Settings
            </button>
            {showSettingsDropdown && (
              <div className='settings-dropmenu'>
                <a href="/profile" className='dropdown-item' onClick={handleProfileClick}>Profile</a>
                <a href='/' className='dropdown-item'>Logout</a>
                <a href='/notification-preferences' className='dropdown-item'>Notification Preferences</a>
                <a href="/emergency-contact" className='dropdown-item' onClick={handleEmergencyContactClick}>Emergency Contact</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <h1>Welcome, {username}</h1>
        <div className='search-container'>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search Doctors by Specialty or Address" 
            onChange={handleSearch}
            aria-label="Search Doctors by Specialty or Address"
          />
          <span className="search-icon">&#128269;</span>
        </div>

        {isLoading ? (
          <p>Loading doctors...</p>
        ) : (
          <div className="doctor-results">
            {searchResults.length > 0 ? (
              searchResults.map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <h3>{doctor.practiceName}</h3>
                  <p>Specialty: {doctor.specialty}</p>
                  <p>Address: {doctor.practiceAddress}</p>
                  <p>Email: {doctor.email}</p>
                  <p>Phone: {doctor.phoneNumber}</p>
                  <button onClick={() => handleSelectDoctor(doctor)}>Select Doctor</button>
                </div>
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}

        <div className='sections-header'>
          <h2>Need help looking for the appropriate specialist?</h2>
        </div>

        <section className="benefits">
          <div className="benefits-grid">
            <div className="benefit-item">
              <img src="/assets/teeth.jpg" alt="Dentist" className="benefit-icon" loading="lazy" />
              <h3>See a Dentist when...</h3>
              <p>You have a toothache or gum pain.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/stress.jpg" alt="Locate Available Doctors" className="benefit-icon" loading="lazy" />
              <h3>See a Psychologist when...</h3>
              <p>You feel overwhelmed, anxious, or depressed.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/flu.jpg" alt="Medication Tracking" className="benefit-icon" loading="lazy" />
              <h3>See a General Practitioner when...</h3>
              <p>You have a fever, cold, or flu symptoms, or need a general health check-up.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/eye.jpg" alt="Emergency Responses" className="benefit-icon" loading="lazy" />
              <h3>See an Optometrist when...</h3>
              <p>You have blurred or double vision, or are experiencing eye strain or headaches.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Patient Bridge. All rights reserved.</p>
        </div>
      </footer>

      {showPrescriptionPopup && (
        <PrescriptionPopup
          isOpen={showPrescriptionPopup}
          onClose={() => setShowPrescriptionPopup(false)}
          currentPatientId={currentPatientId}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
