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
        
        // Check if we have any stored medication status
        const storedStatus = JSON.parse(localStorage.getItem('medicationStatus')) || new Array(data.length).fill(false);
        setMedicationStatus(storedStatus);
      } else {
        console.error('Error fetching medications');
      }
    };
    fetchMedications();
  }, [patient_id]);

  // Handle the checkbox toggle and message display
  const handleCheckboxChange = (index) => {
    const newMedicationStatus = [...medicationStatus];
    newMedicationStatus[index] = !newMedicationStatus[index];

    setMedicationStatus(newMedicationStatus);

    // Set the message based on the checkbox status
    if (newMedicationStatus[index]) {
      setMessage(`You have successfully taken your medication: ${medications[index].name}`);
    } else {
      setMessage('');
    }

    // Store the updated status in localStorage
    localStorage.setItem('medicationStatus', JSON.stringify(newMedicationStatus));
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
          <p>No medications to track. Please add a medication <a href='/medication'>here.</a></p>
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
