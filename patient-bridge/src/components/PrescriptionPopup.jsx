import React, { useState, useEffect, useCallback } from 'react';
import AddMedicationPopup from './AddMedicationPopup';
import '../styles/PrescriptionPopup.css';

const PrescriptionPopup = ({ isOpen, onClose, currentPatientId }) => {
  const [medications, setMedications] = useState([]);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const [editingMedicationIndex, setEditingMedicationIndex] = useState(null);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [medicationToRemove, setMedicationToRemove] = useState(null);

  // Function to fetch medications from the server based on patient ID
  const fetchMedications = useCallback(async () => {
    if (!currentPatientId) return; // Ensure patientId is available
    try {
      const response = await fetch(`http://localhost:5432/api/medications/${currentPatientId}`); // Fetch based on patient ID
      if (!response.ok) throw new Error('Failed to fetch medications');
      const data = await response.json();
      setMedications(data); // Store fetched medications in state
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  }, [currentPatientId]);

  useEffect(() => {
    if (isOpen) {
      fetchMedications(); // Fetch medications when popup opens
    }
  }, [isOpen, fetchMedications]);

  const handleAddMedication = (newMedication) => {
    setMedications((prev) => [...prev, newMedication]); // Add new medication to state
    setIsAddMedicationOpen(false); // Close the add medication popup
  };

  const handleEditMedication = (index) => {
    setEditingMedicationIndex(index);
    setIsAddMedicationOpen(true); // Open the add medication popup for editing
  };

  const handleRemoveMedication = async (medicationId) => {
    try {
      const response = await fetch(`http://localhost:5432/api/medications/${medicationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove medication');
      setMedications((prev) => prev.filter((med) => med.id !== medicationId)); // Remove medication from state
      setIsConfirmRemoveOpen(false); // Close confirm removal modal
    } catch (error) {
      console.error('Error removing medication:', error);
    }
  };

  return (
    <div className={`prescription-popup ${isOpen ? 'open' : ''}`}>
      <div className="prescription-popup-content">
        <h2>Medications</h2>
        <button className="close-button" onClick={onClose}>X</button>
        
        <button className="add-medication-button" onClick={() => setIsAddMedicationOpen(true)}>
          Add Medication
        </button>

        {medications.length === 0 ? (
          <p>No medications added.</p>
        ) : (
          <ul className="medication-list">
            {medications.map((medication, index) => (
              <li key={medication.id} className="medication-item">
                <div>
                  <strong>{medication.name}</strong>
                  <p>Dose: {medication.dose}</p>
                  <p>Frequency: {medication.frequency}</p>
                </div>
                <div className="medication-actions">
                  <button onClick={() => handleEditMedication(index)}>Edit</button>
                  <button onClick={() => {
                    setMedicationToRemove(medication.id);
                    setIsConfirmRemoveOpen(true);
                  }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isAddMedicationOpen && (
          <AddMedicationPopup
            isOpen={isAddMedicationOpen}
            onClose={() => setIsAddMedicationOpen(false)}
            onAddMedication={handleAddMedication}
            medication={editingMedicationIndex !== null ? medications[editingMedicationIndex] : null}
            isEditing={editingMedicationIndex !== null}
            setEditingMedicationIndex={setEditingMedicationIndex}
          />
        )}

        {isConfirmRemoveOpen && (
          <div className="confirm-remove">
            <p>Are you sure you want to remove this medication?</p>
            <button onClick={() => handleRemoveMedication(medicationToRemove)}>Yes</button>
            <button onClick={() => setIsConfirmRemoveOpen(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPopup;
