import React, { useState, useEffect } from 'react';
import '../styles/TrackMedicationPage.css';

const TrackMedicationPage = () => {
  const [medications, setMedications] = useState([]);
  const [medicationStatus, setMedicationStatus] = useState([]);
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null;

  useEffect(() => {
    const fetchMedications = async () => {
      const response = await fetch(`http://localhost:5432/api/medications/${patient_id}`);
      if (response.ok) {
        const data = await response.json();
        setMedications(data);
        setMedicationStatus(new Array(data.length).fill(false));
      } else {
        console.error('Error fetching medications');
      }
    };
    fetchMedications();
  }, [patient_id]);

  const handleCheckboxChange = async (index) => {
    const updatedStatus = medicationStatus.map((status, i) => 
      i === index ? !status : status
    );
    
    setMedicationStatus(updatedStatus);

    const payload = {
      patient_id: patient_id,
      medication_id: medications[index].id,
      taken: updatedStatus[index]
    };

    try {
      const response = await fetch('http://localhost:5432/api/medication-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage(`Medication status updated: ${medications[index].name} marked as ${updatedStatus[index] ? 'taken' : 'not taken'}.`);
      } else {
        setMessage('Failed to update medication status. Please try again.');
      }
    } catch (error) {
      console.error('Error posting medication status:', error);
      setMessage('An error occurred while updating medication status.');
    }
  };

  return (
    <>
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
        <a href='/patient-dashboard' className='back-link'>Back</a>
      </header>
      <div className="track-medication-container">
        <h2>Track Medications</h2>
        {message && <p className="status-message">{message}</p>}
        {medications.length === 0 ? (
          <p>No medications added yet.</p>
        ) : (
          <ul className="medications-list">
            {medications.map((medication, index) => (
              <li key={index} className="medication-item">
                <h3>{medication.name}</h3>
                <p>Dosage: {medication.dosage}</p>
                <p>Time: {medication.time}</p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={medicationStatus[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  Taken
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TrackMedicationPage;
