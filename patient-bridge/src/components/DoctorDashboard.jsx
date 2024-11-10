import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import '../styles/DoctorDashboard.css';
import { FaCalendarAlt, FaFileMedical } from 'react-icons/fa';
import PatientListPopup from './PatientListPopup';
import AppointmentList from './AppointmentList';
import HealthRecordsList from './HealthRecordsList';
import VerifyPractice from './VerifyPractice';
import DoctorAvailability from './DoctorAvailability';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [isPatientListOpen, setIsPatientListOpen] = useState(false);
  const [isAppointmentListOpen, setIsAppointmentListOpen] = useState(false);
  const [isHealthRecordsListOpen, setIsHealthRecordsListOpen] = useState(false);
  const [isVerifyPracticeOpen, setIsVerifyPracticeOpen] = useState(false);
  const [isAvailabiltyListOpen, setIsAvailabiltyListOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null);  // Store doctorId here

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.fullName || user.practiceName || 'Doctor');
      setDoctorId(user.doctor_id);  // Save doctorId from the user data
    }
  
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5432/api/appointments/${user.doctor_id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data); // Set fetched appointments to state
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
  
    if (doctorId) {
      fetchAppointments(); // Fetch appointments only after doctorId is set
    }
  }, [doctorId]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasAppointment = appointments.some(
        appointment => new Date(appointment.appointment_date).toDateString() === date.toDateString()
      );
      return hasAppointment ? <div className="highlight-circle"></div> : null;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
        <div className="nav-links">
          <a href="#!" className="settings-button" onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}>Settings</a>
          {showSettingsDropdown && (
            <div className="settings-dropmenu">
              <a href="#!" className="dropdown-item" onClick={() => navigate('/doctor-profile')}>Profile</a>
              <a href="#!" className="dropdown-item" onClick={() => setIsVerifyPracticeOpen(true)}>Verify Practice</a>
              <a href="/" className="dropdown-item">Logout</a>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-container">
        <div className="left-section">
          <h1>Welcome, {username}</h1>
          <section className="quick-actions">
            <div className="quick-actions-row">
              <div className="action-item" onClick={() => setIsAppointmentListOpen(true)}>
                <FaCalendarAlt className="action-icon" />
                <h3>Manage Appointments</h3>
                <p>View or cancel your upcoming appointments</p>
              </div>
              <div className="action-item" onClick={() => setIsAvailabiltyListOpen(true)}>
                <FaCalendarAlt className="action-icon" />
                <h3>Manage Availability</h3>
                <p>Edit your availability dates</p>
              </div>
            </div>
            <div className="quick-actions-row">
              <div className="action-item" onClick={() => setIsHealthRecordsListOpen(true)}>
                <FaFileMedical className="action-icon" />
                <h3>View Health Records</h3>
                <p>View patient’s health records</p>
              </div>
            </div>
          </section>
        </div>

        <section className="calendar-section">
          <h2>Your Calendar</h2>
          <Calendar tileContent={tileContent} />
        </section>
      </div>

      <PatientListPopup isOpen={isPatientListOpen} onClose={() => setIsPatientListOpen(false)} />
      <AppointmentList isOpen={isAppointmentListOpen} onClose={() => setIsAppointmentListOpen(false)} />
      <HealthRecordsList 
        isOpen={isHealthRecordsListOpen} 
        onClose={() => setIsHealthRecordsListOpen(false)} 
        doctorId={doctorId}  // Pass doctorId to HealthRecordsList
      />
      <VerifyPractice isOpen={isVerifyPracticeOpen} onClose={() => setIsVerifyPracticeOpen(false)} />
      <DoctorAvailability isOpen={isAvailabiltyListOpen} onClose={() => setIsAvailabiltyListOpen(false)} />

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Patient Bridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
