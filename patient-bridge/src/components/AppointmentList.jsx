import React, { useState, useEffect } from 'react';
import "../styles/AppointmentsList.css";

const AppointmentList = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const doctor_id = user ? user.doctor_id : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        if (!doctor_id) {
          setErrorMessage('No doctor selected.');
          return;
        }

        const response = await fetch(`http://localhost:5432/api/appointments/${doctor_id}`);

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          setErrorMessage('Error fetching appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setErrorMessage('Error fetching appointments');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen, doctor_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

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
          {isLoading && <p>Loading...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index} className="records-item">
                  {formatDate(appointment.appointment_date)} at {appointment.appointment_time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
};

export default AppointmentList;
