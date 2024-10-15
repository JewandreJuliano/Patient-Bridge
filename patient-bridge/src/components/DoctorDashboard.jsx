import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import '../styles/DoctorDashboard.css'; 
import { FaCalendarAlt, FaPills, FaFileMedical } from 'react-icons/fa'; 

const DoctorDashboard = () => {
    const [username, setUsername] = useState('');
    const [appointments] = useState([
        { id: 1, date: new Date(2024, 9, 22), patient: 'John Doe', time: '10:00 AM' },
        { id: 2, date: new Date(2024, 9, 25), patient: 'Jane Smith', time: '2:00 PM' },
    ]);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

const handleSettingsDropdownToggle = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
};

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            // Set the username based on the response from the login
            setUsername(user.fullName || user.practiceName || 'Doctor');
        }
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const appointmentDay = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString()
            );
            return appointmentDay ? <div className="highlight-circle"></div> : null;
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="logo-title">
                    <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
                    <h1 className="title">Patient Bridge</h1>
                </div>
                <div className="header-actions">
                <div className="settings-dropdown">
            <button className="settings-button" onClick = {handleSettingsDropdownToggle}>Settings</button>
            {showSettingsDropdown && (
              <div className='settings-dropmenu'>
                <a href='/' className='dropdown-item'>Profile</a>
                <a href='/' className='dropdown-item'>Verify Practice</a>
                <a href='/signup/doctor' className='dropdown-item'>Logout</a>
              </div>
            )}
          </div>
                </div>
            </header>

            <div className="dashboard-container">
                <div className="left-section">
                    <h1>Welcome, {username}</h1> {/* Display username here */}
                    <section className="quick-actions">
                        <div className="action-item">
                            <FaCalendarAlt className="action-icon" />
                            <h3>Manage Appointments</h3>
                            <p>View or Cancel your upcoming appointments</p>
                        </div>
                        <div className="action-item">
                            <FaPills className="action-icon" />
                            <h3>Manage Patient Records</h3>
                            <p>Edit patient health records</p>
                        </div>
                        <div className="action-item">
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

                {/* Daily Schedule */}
                <section className="schedule-section">
                    <h2>These are your upcoming appointments:</h2>
                    {appointments.length > 0 ? (
                        <ul>
                            {appointments.map((appointment) => (
                                <li key={appointment.id}>
                                    <strong>{appointment.date.toDateString()} - {appointment.patient}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No appointments today.</p>
                    )}
                </section>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Patient Bridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default DoctorDashboard;
