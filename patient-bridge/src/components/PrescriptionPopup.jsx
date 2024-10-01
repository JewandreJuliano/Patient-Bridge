// src/components/PrescriptionPopup.js
import React, { useState } from 'react';
import AddMedicationPopup from './AddMedicationPopup';
import '../styles/PrescriptionPopup.css';

const PrescriptionPopup = ({ isOpen, onClose }) => {
  const [medications, setMedications] = useState([]);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const [editingMedicationIndex, setEditingMedicationIndex] = useState(null);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false); // State for confirmation dialog
  const [medicationToRemove, setMedicationToRemove] = useState(null); // Store medication to remove

  const handleAddMedicationClick = () => {
    setEditingMedicationIndex(null);
    setIsAddMedicationOpen(true);
  };

  const handleEditMedicationClick = (index) => {
    setEditingMedicationIndex(index);
    setIsAddMedicationOpen(true);
  };

  const handleAddMedicationClose = () => {
    setIsAddMedicationOpen(false);
  };

  const handleSaveMedication = (medication) => {
    if (editingMedicationIndex !== null) {
      const updatedMedications = medications.map((med, index) =>
        index === editingMedicationIndex ? medication : med
      );
      setMedications(updatedMedications);
    } else {
      setMedications([...medications, medication]);
    }
    setIsAddMedicationOpen(false);
    setEditingMedicationIndex(null);
  };

  const handleRemoveMedication = (index) => {
    setMedicationToRemove(index); // Set the medication to remove
    setIsConfirmRemoveOpen(true); // Open confirmation dialog
  };

  const confirmRemoveMedication = () => {
    if (medicationToRemove !== null) {
      setMedications(medications.filter((_, index) => index !== medicationToRemove));
      setMedicationToRemove(null); // Reset after removal
    }
    setIsConfirmRemoveOpen(false); // Close confirmation dialog
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
              <p>No medications added yet</p>
            ) : (
              <ul>
                {medications.map((medication, index) => (
                  <li key={index} className="medication-item" onClick={() => handleEditMedicationClick(index)}>
                    {medication.medicationName}
                    <button
                      className="remove-medication-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMedication(index);
                      }}
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
            medication={editingMedicationIndex !== null ? medications[editingMedicationIndex] : null}
          />

          {/* Confirmation Dialog */}
          {isConfirmRemoveOpen && (
            <div className="confirmation-popup">
              <div className="confirmation-content">
                <h2>Are you sure?</h2>
                <p>Do you really want to remove "{medications[medicationToRemove]?.medicationName}"?</p>
                <button className="confirm-btn" onClick={confirmRemoveMedication}>
                  OK
                </button>
                <button className="cancel-btn" onClick={() => setIsConfirmRemoveOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PrescriptionPopup;
