import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import "../styles/BookAppointment.css"; // Ensure this path is correct for your CSS

const BookAppointment = () => {
  const location = useLocation(); // Access the location object
  const navigate = useNavigate(); // Initialize useNavigate
  const { doctor } = location.state || {}; // Get the doctor data from state

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("13:00");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const confirmAppointment = async () => {
    try {
        // Retrieve the user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const patient_id = user ? user.patient_id : null; // Get patient_id

        if (!patient_id) {
            alert('Patient ID not found. Please log in again.');
            return;
        }

        const response = await fetch('http://localhost:5432/api/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patient_id: patient_id, 
                doctor_id: doctor.doctor_id,
                appointment_date: moment(selectedDate).format("YYYY-MM-DD"), 
                appointment_time: selectedTime, 
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            navigate('/patient-dashboard');
        } else {
            alert(data.error || 'Error booking appointment.');
        }
    } catch (error) {
        console.error('Error confirming appointment:', error);
        alert('Error booking appointment. Please try again.');
    }
};

  return (
    <div>
      <header className="dashboard-header">
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
      </header>

      {/* Appointment Booking Section */}
      <div className="book-appointment-container">
        <h1 className="heading">Book Appointment</h1>
        <div className="booking-content">
          {doctor && (
            <div className="doctor-info">
              <h2>Doctor's Name: {doctor.practiceName}</h2> 
              <p>Specialty: {doctor.specialty}</p> 
            </div>
          )}

          <div className="appointment-form">
            <div className="date-picker">
              <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
            </div>

            <div className="date-time-inputs">
              <label>Date</label>
              <input type="text" value={moment(selectedDate).format("DD MMMM YYYY")} readOnly />
              <label>Time</label>
              <input type="time" value={selectedTime} onChange={handleTimeChange} />
            </div>

            <button className="confirm-btn" onClick={confirmAppointment}>Confirm Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;