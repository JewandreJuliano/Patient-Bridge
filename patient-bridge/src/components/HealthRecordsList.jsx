import React, { useState, useEffect } from 'react';
import '../styles/HealthRecordsList.css';

const HealthRecordsList = ({ isOpen, onClose }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    illness_name: '',
    diagnosis_date: '',
    treatment_details: '',
    town: ''
  });

  // Fetch patient names when the popup opens
  useEffect(() => {
    const fetchPatientNames = async () => {
      try {
        const response = await fetch('http://localhost:5432/api/appointments'); // Adjust URL as needed
        if (!response.ok) {
          console.error('Error fetching patient names');
          return;
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient names:', error);
      }
    };

    if (isOpen) {
      fetchPatientNames();
    }
  }, [isOpen]);

  // Fetch health records when a patient is selected
  useEffect(() => {
    const fetchHealthRecords = async () => {
      if (!selectedPatientId) return;
      try {
        const response = await fetch(`http://localhost:5432/api/health_records/${selectedPatientId}`);
        if (!response.ok) {
          console.error('Error fetching health records');
          return;
        }
        const data = await response.json();
        setHealthRecords(data); // Set the fetched health records
      } catch (error) {
        console.error('Error fetching health records:', error);
      }
    };

    fetchHealthRecords();
  }, [selectedPatientId]); // Dependency on selectedPatientId ensures health records are fetched when a patient is selected

  // Handle patient selection
  const handlePatientClick = (id) => {
    console.log("Patient button clicked, setting selectedPatientId:", id);
    setSelectedPatientId(id); // Update the selected patient ID
  };

  // Handle adding a new health record
  const handleAddRecord = async () => {
    if (!newRecord.illness_name || !newRecord.diagnosis_date || !newRecord.treatment_details || !newRecord.town) return;

    try {
      const response = await fetch(`http://localhost:5432/api/health_records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newRecord, 
          patient_id: selectedPatientId  // Ensure patient_id is sent with the new record
        }),
      });

      if (!response.ok) {
        console.error('Error adding health record');
        return;
      }

      const addedRecord = await response.json();
      setHealthRecords((prevRecords) => [...prevRecords, addedRecord]); // Add the newly added record to the list
      setNewRecord({ illness_name: '', diagnosis_date: '', treatment_details: '', town: '' }); // Reset form
    } catch (error) {
      console.error('Error adding health record:', error);
    }
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button
            style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }}
            onClick={onClose}
          >
            X
          </button>
          <h2>Manage Health Records</h2>

          {!selectedPatientId ? (
            <div>
              <h3>Select a Patient</h3>
              <ul>
                {patients.map((patient) => (
                  <li key={patient.id}>
                    <button onClick={() => handlePatientClick(patient.id)}>
                      {patient.patientName} {/* Ensure this field matches your data */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3>Health Records for {patients.find((p) => p.id === selectedPatientId)?.patientName}</h3>
              <button onClick={() => setSelectedPatientId(null)}>Back to Patient List</button>

              {/* Form for adding new health records */}
              <div className="health-record-form">
                <h4>Add New Health Record</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <label>
                    Illness Name:
                    <input
                      type="text"
                      value={newRecord.illness_name}
                      onChange={(e) => setNewRecord({ ...newRecord, illness_name: e.target.value })}
                      placeholder="Illness Name"
                    />
                  </label>
                  <label>
                    Diagnosis Date:
                    <input
                      type="date"
                      value={newRecord.diagnosis_date}
                      onChange={(e) => setNewRecord({ ...newRecord, diagnosis_date: e.target.value })}
                    />
                  </label>
                  <label>
                    Treatment Details:
                    <textarea
                      value={newRecord.treatment_details}
                      onChange={(e) => setNewRecord({ ...newRecord, treatment_details: e.target.value })}
                      placeholder="Treatment Details"
                    />
                  </label>
                  <label>
                    Town:
                    <input
                      type="text"
                      value={newRecord.town}
                      onChange={(e) => setNewRecord({ ...newRecord, town: e.target.value })}
                      placeholder="Town"
                    />
                  </label>
                  <button type="button" onClick={handleAddRecord}>
                    Save Record
                  </button>
                </form>
              </div>

              {/* Display list of health records */}
              <div id="health-records-list">
                {healthRecords.length > 0 ? (
                  <ul>
                    {healthRecords.map((record) => (
                      <li key={record.record_id} className="record-item">
                        <strong>{record.illness_name}</strong> - {record.treatment_details} <em>({record.diagnosis_date})</em> - <span>{record.town}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No health records found for this patient.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default HealthRecordsList;
