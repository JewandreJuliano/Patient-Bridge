import React, { useState } from 'react';
import '../styles/PatientListPopup.css';

const AppointmentList = ({ isOpen, onClose }) => {
  const [records, setRecords] = useState([]); // Currently no patients listed

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>Health Records List</h2>
          <div id="records-list">
            {records.length === 0 ? (
              <p>No patient records listed yet</p>
            ) : (
              <ul>
                {records.map((patient, index) => (
                  <li key={index} className="records-item">
                    {records.name}
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