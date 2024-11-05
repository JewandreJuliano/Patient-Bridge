import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/HealthRecordsList.css';

const HealthRecordsList = ({ isOpen, onClose }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Handle patient selection and navigate to the PatientHealthRecord form
  const handlePatientClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/patient-health-record/${id}`); // Navigate to the health records form for the selected patient
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
          <h2>Manage Patients</h2>

          <div>
            <h3>Select a Patient</h3>
            <div className="patient-list">
              {patients.map((patient) => (
                <div key={patient.id} className="patient-item">
                  <button onClick={() => handlePatientClick(patient.id)}>
                    {patient.patientName} {/* Ensure this field matches your data */}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default HealthRecordsList;
