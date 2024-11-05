import React, { useState, useEffect } from 'react';
import '../styles/PatientListPopup.css';

const AppointmentList = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]); // Correctly initialized as an array

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5432/api/appointments'); // Adjust URL as needed
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching appointments:', response.status, errorText);
          return;
        }
        const data = await response.json();
        console.log('Fetched appointments:', data); // Log the data fetched

        // Ensure the response is an array
        if (Array.isArray(data)) {
          setAppointments(data); // Set appointments data
        } else {
          console.error('Fetched data is not an array:', data);
          setAppointments([]); // Reset if data is not an array
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (isOpen) {
      fetchAppointments(); // Fetch appointments when popup is open
    }
  }, [isOpen]); // Dependency array to fetch appointments when isOpen changes

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button 
            style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} 
            onClick={onClose}
          >
            X
          </button>
          <h2>Appointments List</h2>
          <div id="appointment-list">
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment, index) => {
                  const appointmentDate = new Date(appointment.appointment_date); // Create date from appointment_date
                  const formattedDate = appointmentDate.toLocaleDateString(); // Format as readable date
                  const appointmentTime = appointment.appointment_time; // Retrieve appointment_time directly
                  const formattedTime = new Date(`1970-01-01T${appointmentTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Format time as 24-hour

                  return (
                    <li key={index} className="appointment-item">
                      <span>{appointment.patientName}</span> {/* Patient's name */}
                      <span> - {formattedDate} at {formattedTime}</span> {/* Appointment date and time */}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No appointments listed yet</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AppointmentList;
