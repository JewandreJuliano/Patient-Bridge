import React, { useState, useEffect } from 'react';
import "../styles/PatientAppointments.css";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        const response = await fetch(`http://localhost:5432/api/patient-appointments/${patient_id}`);
        
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

    if (patient_id) {
      fetchAppointments();
    }
  }, [patient_id]);

  const handleDeleteAppointment = async (appointment_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5432/api/delete-appointment/${appointment_id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setAppointments(appointments.filter(appointment => appointment.appointment_id !== appointment_id));
          alert('Appointment deleted successfully');
        } else {
          alert('Error deleting appointment');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment. Please try again.');
      }
    }
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <div>
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
        <a href='/patient-dashboard' className='back-link'>Back</a>
      </header>
      <h2>Your Appointments</h2>
      <div className="app-container">
        {isLoading && <p>Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{formatDate(appointment.appointment_date)}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.appointment_id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientAppointments;
