import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "../styles/BookAppointment.css"; // Ensure this path is correct for your CSS

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("13:00");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const confirmAppointment = () => {
    alert(`Appointment Confirmed for ${moment(selectedDate).format("DD MMMM YYYY")} at ${selectedTime}`);
  };

  return (
    <div>
      {/* Header Section */}
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
          <div className="doctor-info">
            <h2>Doctor's Name</h2>
            <p>Occupation: General Practitioner</p>
          </div>

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
