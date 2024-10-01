// src/components/PrescriptionPopup.js
import React, { useState } from 'react';
import AddMedicationPopup from './AddMedicationPopup'; // Import Add Medication Popup component
import '../styles/PrescriptionPopup.css';

const PrescriptionPopup = ({ isOpen, onClose }) => {
  const [medications, setMedications] = useState([]);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);

  const handleAddMedicationClick = () => {
    setIsAddMedicationOpen(true);
  };

  const handleAddMedicationClose = () => {
    setIsAddMedicationOpen(false);
  };

  const handleSaveMedication = (medication) => {
    setMedications([...medications, medication]);
  };

  const handleRemoveMedication = (indexToRemove) => {
    setMedications(medications.filter((_, index) => index !== indexToRemove));
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>Prescriptions</h2>
          <div id="medications-list">
            {medications.length === 0 ? (
              <p>No medications added yet</p> // Placeholder for no medications
            ) : (
              <ul>
                {medications.map((medication, index) => (
                  <li key={index} className="medication-item">
                    {medication.medicationName} - {medication.dosage}, {medication.timesPerDay} times per day ({medication.timeOfDay})
                    <button
                      className="remove-medication-btn"
                      onClick={() => handleRemoveMedication(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="add-medication-btn" onClick={handleAddMedicationClick}>
            + Add Medication
          </button>

          {/* Add Medication Popup */}
          <AddMedicationPopup
            isOpen={isAddMedicationOpen}
            onClose={handleAddMedicationClose}
            onSave={handleSaveMedication}
          />
        </div>
      </div>
    )
  );
};

export default PrescriptionPopup;
