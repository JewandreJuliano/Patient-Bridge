import React, { useState, useEffect, useCallback } from 'react';
import AddMedicationPopup from './AddMedicationPopup';
import '../styles/PrescriptionPopup.css';

const PrescriptionPopup = ({ isOpen, onClose, medicationId }) => { // Updated to use medicationId prop
  const [medications, setMedications] = useState([]);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const [editingMedicationIndex, setEditingMedicationIndex] = useState(null);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [medicationToRemove, setMedicationToRemove] = useState(null);

  // Function to fetch medications from the server based on medication ID
  const fetchMedications = useCallback(async () => {
    if (!medicationId) return; // Ensure medicationId is available
    try {
      const response = await fetch(`/api/medications/${medicationId}`); // Fetch based on medication ID
      if (!response.ok) throw new Error('Failed to fetch medication');
      const data = await response.json();
      setMedications(data ? [data] : []); // Set the fetched medication (assumes a single object is returned)
    } catch (error) {
      console.error('Error fetching medication:', error);
    }
  }, [medicationId]);

  // Fetch medications when the popup is opened or medicationId changes
  useEffect(() => {
    if (isOpen) {
      fetchMedications();
    }
  }, [isOpen, fetchMedications]);

  const handleAddMedicationClick = () => {
    setEditingMedicationIndex(null); // Clear the editing index for adding new medication
    setIsAddMedicationOpen(true);
  };

  const handleEditMedicationClick = (index) => {
    setEditingMedicationIndex(index); // Set the index for editing the selected medication
    setIsAddMedicationOpen(true);
  };

  const handleAddMedicationClose = () => {
    setIsAddMedicationOpen(false); // Close the add/edit medication popup
  };

  const handleSaveMedication = (medication) => {
    if (editingMedicationIndex !== null) {
      const updatedMedications = medications.map((med, index) =>
        index === editingMedicationIndex ? medication : med
      );
      setMedications(updatedMedications); // Update the medications list
    } else {
      setMedications([...medications, medication]); // Add new medication
    }
    setIsAddMedicationOpen(false);
    setEditingMedicationIndex(null);
  };

  const handleRemoveMedication = (index) => {
    setMedicationToRemove(index); // Set the medication index to remove
    setIsConfirmRemoveOpen(true); // Open the confirmation dialog
  };

  const confirmRemoveMedication = async () => {
    const medicationId = medications[medicationToRemove]?.medication_id;
    if (!medicationId) return;

    try {
      const response = await fetch(`/api/medications/${medicationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete medication');

      setMedications(medications.filter((_, index) => index !== medicationToRemove)); // Remove medication from the list
      setMedicationToRemove(null);
    } catch (error) {
      console.error('Error removing medication:', error);
    } finally {
      setIsConfirmRemoveOpen(false); // Close the confirmation dialog
    }
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>X</button>
          <h2>Medications</h2>
          <div id="medications-list">
            {medications.length === 0 ? ( // Check if medications list is empty
              <p>No medications added yet</p> // Default message
            ) : (
              <ul>
                {medications.map((medication, index) => (
                  <li key={medication.medication_id} className="medication-item" onClick={() => handleEditMedicationClick(index)}>
                    {medication.medication_name}
                    <button
                      className="remove-medication-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering edit on remove button click
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
          <button className="add-medication-btn" onClick={handleAddMedicationClick}>+ Add Medication</button>
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
                <p>Do you really want to remove "{medications[medicationToRemove]?.medication_name}"?</p>
                <button className="confirm-btn" onClick={confirmRemoveMedication}>OK</button>
                <button className="cancel-btn" onClick={() => setIsConfirmRemoveOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PrescriptionPopup;
