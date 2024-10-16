import React, { useState, useEffect } from 'react';
import '../styles/PatientDashboard.css'; // Import the CSS file for styling
import PrescriptionPopup from './PrescriptionPopup';

const PatientDashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility
  const [username, setUsername] = useState(''); // State to store the username
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [doctors, setDoctors] = useState([]); // State for doctors
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for selected doctor
  const [appointmentDate, setAppointmentDate] = useState(''); // State for appointment date
  const [appointments, setAppointments] = useState([]); // State for user's appointments

  useEffect(() => {
    // Retrieve user info from localStorage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.fullName || storedUser.practiceName || 'User'); // Fallback to 'User' if no name
    }
    
    // Fetch all doctors and user's appointments when the component mounts
    fetchDoctors();
    fetchAppointments();
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

  const fetchAppointments = async () => {
    const patientId = JSON.parse(localStorage.getItem('user')).patient_id;
    try {
      const response = await fetch(`http://localhost:5432/api/appointments/${patientId}`);
      const data = await response.json();
      setAppointments(data); // Store fetched appointments in state
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const results = doctors.filter(doc => 
      doc.specialty.toLowerCase().includes(query) || 
      doc.practiceAddress.toLowerCase().includes(query) // Updated to use practiceAddress
    );
    setSearchResults(results);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor
  };

  const handleBookAppointment = async () => {
    const patientId = JSON.parse(localStorage.getItem('user')).patient_id;
    const appointmentDetails = {
      patient_id: patientId,
      doctor_id: selectedDoctor.doctor_id,
      appointment_date: appointmentDate,
    };

    try {
      const response = await fetch('http://localhost:5432/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentDetails),
      });

      if (response.ok) {
        fetchAppointments(); // Refresh appointments after booking
        setSelectedDoctor(null);
        setAppointmentDate('');
      } else {
        console.error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5432/api/cancel-appointment/${appointmentId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        fetchAppointments(); // Refresh appointments after cancellation
      } else {
        console.error('Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleSettingsDropdownToggle = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
        <div className="header-actions">
          <button className="track-button">Track Medication</button>
          <button className="prescriptions-button" onClick={openPopup}>
            Prescriptions
          </button>
          <div className="settings-dropdown">
            <button className="settings-button" onClick={handleSettingsDropdownToggle}>Settings</button>
            {showSettingsDropdown && (
              <div className='settings-dropmenu'>
                <a href='/' className='dropdown-item'>General</a>
                <a href='/signup/patient' className='dropdown-item'>Logout</a>
                <a href='/' className='dropdown-item'>Notification Preferences</a>
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
            placeholder="Search by Condition or Address" 
            onChange={handleSearch} 
          />
          <span className="search-icon">&#128269;</span>
        </div>

        <div className='sections-header'>
          <h2>Let Us Guide You to the Right Specialist!</h2>
        </div>

        {/* Display search results */}
        <div className="doctor-results">
          {searchResults.length > 0 ? (
            searchResults.map((doctor) => (
              <div key={doctor.doctor_id} className="doctor-card" onClick={() => handleSelectDoctor(doctor)}>
                <h3>{doctor.practiceName}</h3>
                <p>Specialty: {doctor.specialty}</p>
                <p>Address: {doctor.practiceAddress}</p>
                <p>Email: {doctor.email}</p>
                <p>Phone: {doctor.phoneNumber}</p>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>

        {selectedDoctor && (
          <div>
            <h3>Selected Doctor: {selectedDoctor.practiceName}</h3>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <button onClick={handleBookAppointment}>Book Appointment</button>
          </div>
        )}

        <div>
          <h2>Your Appointments</h2>
          {appointments.map(appointment => (
            <div key={appointment.appointment_id}>
              <p>{appointment.appointment_date} - {appointment.status}</p>
              <button onClick={() => handleCancelAppointment(appointment.appointment_id)}>Cancel</button>
            </div>
          ))}
        </div>

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
              <p>You have a fever, cold, or flu symptoms, or just need a general health check up.</p>
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
