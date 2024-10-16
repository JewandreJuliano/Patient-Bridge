import React, { useState } from 'react';
import '../styles/DoctorCard.css'; // Create this CSS file for styles

const DoctorCard = ({ doctor, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="doctor-card">
      <h3 onClick={toggleDetails} className="doctor-name">
        {doctor.practiceName} - {doctor.specialty}
      </h3>
      {isOpen && (
        <div className="doctor-details">
          <p>Address: {doctor.practiceAddress}</p>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phoneNumber}</p>
          <button onClick={() => onSelect(doctor)}>Select Doctor</button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
