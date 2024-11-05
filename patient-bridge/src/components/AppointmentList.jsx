import React, { useState } from 'react';
import '../styles/PatientListPopup.css';

const AppointmentList = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]); // Currently no patients listed

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
        <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
  X
</button>
          <h2>Appointments List</h2>
          <div id="appointment-list">
            {appointments.length === 0 ? (
              <p>No appointments listed yet</p>
            ) : (
              <ul>
                {appointments.map((patient, index) => (
                  <li key={index} className="appointment-item">
                    {appointments.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AppointmentList;
