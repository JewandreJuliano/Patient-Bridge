// src/components/TrackMedicationPage.js
import React, { useState } from 'react';
import '../styles/TrackMedicationPage.css';

const TrackMedicationPage = ({ medications }) => {
  const [medicationStatus, setMedicationStatus] = useState(
    medications.map((medication) =>
      Array(medication.timesPerDay).fill(false) // Initialize all checkboxes to "not taken"
    )
  );

  const handleCheckboxChange = (medIndex, timeIndex) => {
    const updatedStatus = medicationStatus.map((status, index) => {
      if (index === medIndex) {
        return status.map((taken, idx) => (idx === timeIndex ? !taken : taken));
      }
      return status;
    });
    setMedicationStatus(updatedStatus);
  };

  return (
    <div className="track-medication-container">
      <h2>Track Medications</h2>
      {medications.length === 0 ? (
        <p>No medications added yet</p>
      ) : (
        <ul className="medications-list">
          {medications.map((medication, medIndex) => (
            <li key={medIndex} className="medication-item">
              <h3>{medication.medicationName}</h3>
              <p>Dosage: {medication.dosage}</p>
              <p>Times per Day: {medication.timesPerDay}</p>
              <div className="time-checkboxes">
                {medication.timeOfDay.map((time, timeIndex) => (
                  <div key={timeIndex} className="medication-time">
                    <label>
                      <input
                        type="checkbox"
                        checked={medicationStatus[medIndex][timeIndex]}
                        onChange={() => handleCheckboxChange(medIndex, timeIndex)}
                      />
                      {time}
                    </label>
                  </div>
                ))}
              </div>
              <p>
                You still need to take{' '}
                {medication.timesPerDay - medicationStatus[medIndex].filter((taken) => taken).length}/
                {medication.timesPerDay} doses today.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackMedicationPage;
