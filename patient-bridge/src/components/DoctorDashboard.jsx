import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import '../styles/DoctorDashboard.css'; 
import { FaCalendarAlt, FaPills, FaFileMedical } from 'react-icons/fa'; 

const DoctorDashboard = () => {
    const [appointments] = useState([
        { id: 1, date: new Date(2024, 9, 22), patient: 'John Doe', time: '10:00 AM' },
        { id: 2, date: new Date(2024, 9, 25), patient: 'Jane Smith', time: '2:00 PM' },
    ]);

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
                    <button className="settings-button">Settings</button>
                </div>
            </header>

            <div className="dashboard-container">
                <div className="left-section">
                    <h1>Welcome Doctor</h1>
                    <section className="quick-actions">
                        <div className="action-item">
                            <FaCalendarAlt className="action-icon" />
                            <h3>Manage Appointments</h3>
                            <p>View or Cancel your upcoming appointments</p>
                        </div>
                        <div className="action-item">
                            <FaPills className="action-icon" />
                            <h3>Manage Medication</h3>
                            <p>Add, Remove or Edit patient medication</p>
                        </div>
                        <div className="action-item">
                            <FaFileMedical className="action-icon" />
                            <h3>View Health Records</h3>
                            <p>View an upcoming or current patient's health records</p>
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
