import React, { useState, useEffect } from 'react';
import '../styles/PatientHealthRecord.css';

const PatientHealthRecord = ({ patientId }) => {
  const [illnessName, setIllnessName] = useState('');
  const [diagnosisDate, setDiagnosisDate] = useState('');
  const [treatmentDetails, setTreatmentDetails] = useState('');
  const [town, setTown] = useState('');
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch health records for the selected patient
  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        const response = await fetch(`http://localhost:5432/api/health-records/${patientId}`);
        if (!response.ok) {
          setMessage('No health records found.');
          return;
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        setMessage('Error fetching health records.');
      }
    };

    if (patientId) {
      fetchHealthRecords();
    }
  }, [patientId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      patient_id: patientId,
      illness_name: illnessName,
      diagnosis_date: diagnosisDate,
      treatment_details: treatmentDetails,
      town: town,
    };

    try {
      const response = await fetch('http://localhost:5432/health-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Health record saved successfully!');
        // Optionally, you can refresh the health records after adding a new one
        setRecords((prevRecords) => [...prevRecords, newRecord]);
      } else {
        setMessage('Failed to save health record.');
      }
    } catch (error) {
      setMessage('Error saving health record.');
    }
  };

  // Handle Cancel button click
  const handleCancel = () => {
    // Redirect to /doctor-dashboard
    window.location.href = '/doctor-dashboard';
  };

  return (
    <div className="patient-health-record-container">
      <h3>Patient Health Records</h3>
      {message && <p>{message}</p>}

      <div className="health-records-list">
        <h4>Existing Health Records</h4>
        {records.length > 0 ? (
          <ul>
            {records.map((record) => (
              <li key={record.record_id}>
                <strong>{record.illness_name}</strong>
                <p>Diagnosis Date: {new Date(record.diagnosis_date).toLocaleDateString()}</p>
                <p>Treatment: {record.treatment_details}</p>
                <p>Town: {record.town}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No records found for this patient.</p>
        )}
      </div>

      <div className="add-record-form">
        <h4>Add New Health Record</h4>
        <form onSubmit={handleSubmit}>
          <label>Illness Name</label>
          <input
            type="text"
            value={illnessName}
            onChange={(e) => setIllnessName(e.target.value)}
            required
          />

          <label>Diagnosis Date</label>
          <input
            type="date"
            value={diagnosisDate}
            onChange={(e) => setDiagnosisDate(e.target.value)}
            required
          />

          <label>Treatment Details</label>
          <textarea
            value={treatmentDetails}
            onChange={(e) => setTreatmentDetails(e.target.value)}
            required
          />

          <label>Town</label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            required
          />

          <div className="button-container">
            <button type="submit">Save Record</button>
            <button type="button" onClick={handleCancel} style={{ backgroundColor: '#f44336' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientHealthRecord;
