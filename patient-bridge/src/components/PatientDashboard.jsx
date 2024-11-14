import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientDashboard.css';
import NotificationPref from './NotificationPref';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentPatientId, setCurrentPatientId] = useState(null); // State for patient ID
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isNotifOpen, setIsNotifOpen] = useState(false); // State for login popup


  const handleOpenNotif = () => {
    setIsNotifOpen(true); // Open login popup
};

const handleCloseNotif = () => {
    setIsNotifOpen(false); // Close login popup
};
  // Memoized fetchPatientData function
  const fetchPatientData = useCallback(async () => {
    if (currentPatientId) {
      try {
        const response = await fetch(`http://localhost:5432/api/patients/${currentPatientId}`);
        const data = await response.json();
        console.log('Patient data:', data);
        // Handle patient data as needed
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
  }, [currentPatientId]); // Depend on currentPatientId

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.fullName || storedUser.practiceName || 'User');
      const patientId = storedUser.patientId || null; // Retrieve patient ID
      setCurrentPatientId(patientId);
      // Store patient ID in local storage for easy access later if needed
      localStorage.setItem('currentPatientId', patientId);
    }

    fetchDoctors();

    // Fetch patient data if currentPatientId is set
    if (currentPatientId) {
      fetchPatientData();
      console.log("Current Patient ID:", currentPatientId); // Log to verify
    }

    // Event listener for outside clicks to close settings dropdown
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.settings-dropdown')) {
        setShowSettingsDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [currentPatientId, fetchPatientData]); // Include fetchPatientData as a dependency

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5432/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
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

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleEmergencyContactClick = () => {
    navigate('/emergency-contact');
  };

  const handleSelectDoctor = (doctor) => {
    navigate('/book-apt', { state: { doctor, patientId: currentPatientId } }); // Pass patient ID to the booking page
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
        <div className="nav-links">
          <a href="#!" className="track-button" onClick={handleTrackMedicationClick} aria-label="Track Medication">
            Track Medication
          </a>
          <a href='/medication' className="prescriptions-button" aria-label="Medications">
            Medications
          </a>
          <a href='/patient-apts' className="apts-button" aria-label="My Appointments">
          My Appointments
          </a>
          <div className="settings-dropdown">
            <a href='#!' className="settings-button" onClick={handleSettingsDropdownToggle} aria-label="Settings">
              Settings
            </a>
            {showSettingsDropdown && (
              <div className='settings-dropmenu'>
                <a href="/profile" className='dropdown-item' onClick={handleProfileClick}>Profile</a>
                <a href='#!' className='dropdown-item' onClick={handleOpenNotif}>Notification Preferences</a>
                <a href="/emergency-contact" className='dropdown-item' onClick={handleEmergencyContactClick}>Emergency Contact</a>
                <a href='/' className='dropdown-item'>Logout</a>
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
      {isNotifOpen && (
        <NotificationPref isOpen={isNotifOpen} onClose={handleCloseNotif} />
      )}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Patient Bridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientDashboard;
