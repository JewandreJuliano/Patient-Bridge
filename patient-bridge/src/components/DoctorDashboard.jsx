import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'; 
import '../styles/DoctorDashboard.css'; 
import { FaCalendarAlt, FaPills, FaFileMedical } from 'react-icons/fa'; 
import PatientListPopup from './PatientListPopup'; // Import the PatientListPopup component
import AppointmentList from './AppointmentList'; // Ensure you have this component imported
import HealthRecordsList from './HealthRecordsList';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [appointments, setAppointments] = useState([]); // State for appointments
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [isPatientListOpen, setIsPatientListOpen] = useState(false); // State for the patient list popup
    const [isAppointmentListOpen, setIsAppointmentListOpen] = useState(false); // State for the appointment list popup
    const[ isHealthRecordsListOpen, setIsHealthRecordsListOpen] = useState(false);

    const handleSettingsDropdownToggle = () => {
        setShowSettingsDropdown(!showSettingsDropdown);
    };

    const handleDoctorProfileClick = () => {
        navigate('/doctor-profile');
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.fullName || user.practiceName || 'Doctor');
        }

        // Fetch or define appointments dynamically here
        const today = new Date();
        const upcomingAppointments = [
            { id: 1, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), patient: 'John Doe', time: '10:00 AM' },
            { id: 2, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), patient: 'Jane Smith', time: '2:00 PM' },
        ];
        setAppointments(upcomingAppointments); // Set appointments dynamically
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const appointmentDay = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString()
            );
            return appointmentDay ? <div className="highlight-circle"></div> : null;
        }
    };

    const handleManagePatientsClick = () => {
        setIsPatientListOpen(true); // Open the patient list popup
    };

    const handleManageAppointmentsClick = () => {
        setIsAppointmentListOpen(true); // Open the appointment list popup
    };

    const handleViewHealthRecordsClick = () => {
        setIsHealthRecordsListOpen(true);
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">Patient Bridge</h1>
                </div>
                <div className="header-actions">
                    <div className="settings-dropdown">
                        <button className="settings-button" onClick={handleSettingsDropdownToggle}>Settings</button>
                        {showSettingsDropdown && (
                            <div className='settings-dropmenu'>
                                <a href className='dropdown-item' onClick={handleDoctorProfileClick}>Profile</a>
                                <a href='/' className='dropdown-item'>Verify Practice</a>
                                <a href='/signup/doctor' className='dropdown-item'>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="dashboard-container">
                <div className="left-section">
                    <h1>Welcome, {username}</h1>
                    <section className="quick-actions">
                        <div className="action-item" onClick={handleManageAppointmentsClick}>
                            <FaCalendarAlt className="action-icon" />
                            <h3>Manage Appointments</h3>
                            <p>View or Cancel your upcoming appointments</p>
                        </div>
                        <div className="action-item" onClick={handleManagePatientsClick}> {/* Click handler added */}
                            <FaPills className="action-icon" />
                            <h3>Manage Patient Records</h3>
                            <p>Edit patient health records</p>
                        </div>
                        <div className="action-item" onClick = {handleViewHealthRecordsClick}>
                            <FaFileMedical className="action-icon" />
                            <h3>View Health Records</h3>
                            <p>View patient's health records</p>
                        </div>
                    </section>
                </div>

                {/* Calendar Section */}
                <section className="calendar-section">
                    <h2>Your Calendar</h2>
                    <Calendar tileContent={tileContent} />
                </section>
                
            </div>

            {/* Patient List Popup */}
            <PatientListPopup isOpen={isPatientListOpen} onClose={() => setIsPatientListOpen(false)} />
            <AppointmentList isOpen={isAppointmentListOpen} onClose={() => setIsAppointmentListOpen(false)} />
            <HealthRecordsList isOpen = {isHealthRecordsListOpen} onClose={() => setIsHealthRecordsListOpen(false)}/>
            
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default DoctorDashboard;
