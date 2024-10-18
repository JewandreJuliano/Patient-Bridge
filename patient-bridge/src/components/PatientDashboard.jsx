import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/PatientDashboard.css'; // Import the CSS file for styling
import PrescriptionPopup from './PrescriptionPopup';

const PatientDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState(''); // State to store the username
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [doctors, setDoctors] = useState([]); // State for doctors
  const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false); 
  const [searchResults, setSearchResults] = useState([]); // State for search results

  useEffect(() => {
    // Retrieve user info from localStorage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.fullName || storedUser.practiceName || 'User'); // Fallback to 'User' if no name
    }

    // Fetch all doctors when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5432/api/doctors'); // Update with your actual server URL
      const data = await response.json();
      setDoctors(data); // Store fetched doctors in state
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const results = doctors.filter(doc => 
      doc.specialty.toLowerCase().includes(query) || 
      doc.practiceAddress.toLowerCase().includes(query)
    );
    setSearchResults(results);

    // Clear search results when input is empty
    if (event.target.value === '') {
      setSearchResults([]);
    }
  };

  const handleSettingsDropdownToggle = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const handlePrescriptionsClick = () => {
    setShowPrescriptionPopup(true); // Show the prescriptions popup when the button is clicked
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the Profile page
  };

  const handleEmergencyContactClick = () => {
    navigate('/emergency-contact');
  };

  const handleSelectDoctor = (doctor) => {
    navigate('/book-apt', { state: { doctor } }); // Navigate to BookAppointment page with doctor info
  };

  const handleTrackMedicationClick = () => {
    navigate('/track-medications'); // Navigate to TrackMedicationPage
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
        <div className="header-actions">
          <button className="track-button" onClick={handleTrackMedicationClick}>Track Medication</button>
          <button className="prescriptions-button" onClick={handlePrescriptionsClick}>Prescriptions</button>
          <div className="settings-dropdown">
            <button className="settings-button" onClick={handleSettingsDropdownToggle}>Settings</button>
            {showSettingsDropdown && (
              <div className='settings-dropmenu'>
                <a href="#" className='dropdown-item' onClick={handleProfileClick}>Profile</a>
                <a href='/signup/patient' className='dropdown-item'>Logout</a>
                <a href='/notification-preferences' className='dropdown-item'>Notification Preferences</a>
                <a href="#" className='dropdown-item' onClick={handleEmergencyContactClick}>Emergency Contact</a>
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
            placeholder="Search by Specialty" 
            onChange={handleSearch} 
          />
          <span className="search-icon">&#128269;</span>
        </div>

        {/* Display search results */}
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

        <div className='sections-header'>
          <h2>Let Us Guide You to the Right Specialist!</h2>
        </div>

        {/* Other sections here... */}
        <div className="sections">
          <div className="section">
            <div className="section-item">
              <img src="/assets/teeth.jpg" alt="Section 1" className="section-image" />
            </div>
            <h2>See a Dentist when...</h2>
            <div className='description'>
              <p>You have a toothache or gum pain.</p>
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
            </div>
            <h2>See a General Practitioner when...</h2>
            <div className='description'>
              <p>You have a fever, cold, or flu symptoms, or just need a general health check-up.</p>
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

      <PrescriptionPopup 
        isOpen={showPrescriptionPopup} 
        onClose={() => setShowPrescriptionPopup(false)} // Function to close the popup
      />
    </div>
  );
};

export default PatientDashboard;
