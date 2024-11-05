import React, { useState } from 'react';
import '../styles/PatientListPopup.css';

const PatientListPopup = ({ isOpen, onClose }) => {
  const [patients, setPatients] = useState([]); // Currently no patients listed

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
        <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
  X
</button>

          <h2>Patient List</h2>
          <div id="patients-list">
            {patients.length === 0 ? (
              <p>No patients listed yet</p>
            ) : (
              <ul>
                {patients.map((patient, index) => (
                  <li key={index} className="patient-item">
                    {patient.name}
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

export default PatientListPopup;
