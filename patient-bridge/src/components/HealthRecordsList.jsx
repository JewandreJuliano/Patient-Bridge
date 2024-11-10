import React, { useState, useEffect } from 'react';

const HealthRecordsList = ({ doctorId, isOpen, onClose }) => {
  const [patients, setPatients] = useState([]); // Store the list of patients
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newRecord, setNewRecord] = useState({
    illness_name: '',
    diagnosis_date: '',
    treatment_details: '',
    town: '',
  });

  useEffect(() => {
    if (!doctorId) {
      console.error('doctorId is missing');
      return; // Prevent API call if doctorId is missing
    }

    // Fetch patients assigned to the doctor
    fetch(`http://localhost:5432/api/patients-assigned/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data); // Log the response
        // Check if data is an array and has valid patient info
        if (Array.isArray(data) && data.length > 0) {
          console.log('Fetched Patients:', data); // Debugging log
          setPatients(data); // Set patients state only if data is valid
        } else {
          console.error('Expected an array with patients, but got:', data);
          alert('No patients assigned to this doctor.');
        }
      })
      .catch((err) => {
        console.error('Error fetching patients:', err);
        alert('Error fetching patients');
      });
  }, [doctorId]);

  const handleAddRecord = () => {
    if (!isFormValid()) return;

    const recordData = {
      patient_id: selectedPatient.patient_id,
      ...newRecord,
    };

    fetch('/api/add-health-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          resetForm(); // Reset form after saving successfully
        } else {
          alert('Error adding health record.');
        }
      });
  };

  const isFormValid = () => {
    const { illness_name, diagnosis_date, treatment_details, town } = newRecord;
    if (!illness_name || !diagnosis_date || !treatment_details || !town || !selectedPatient) {
      alert('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setNewRecord({
      illness_name: '',
      diagnosis_date: '',
      treatment_details: '',
      town: '',
    });
    setSelectedPatient(null);
  };

  const closeFormForCurrentPatient = () => {
    resetForm(); // Reset the form and clear the patient data
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button onClick={onClose}>X</button>
          <h2>Manage Health Records</h2>

          {/* Assigned Patients List */}
          <h3>Assigned Patients</h3>
          <ul>
            {patients.length ? (
              patients.map((patient) => (
                <li key={patient.patient_id}>
                  <button 
                    onClick={() => {
                      setSelectedPatient(patient);  // Set the selected patient
                    }}
                  >
                    {patient.fullName} {/* Display the patient's full name */}
                  </button>
                </li>
              ))
            ) : (
              <li>No patients available</li>
            )}
          </ul>

          {/* Add Record Form */}
          {selectedPatient && (
            <div>
              <h3>Add Record for {selectedPatient.fullName}</h3> {/* Show selected patient's name */}
              <form>
                <input
                  type="text"
                  placeholder="Illness Name"
                  value={newRecord.illness_name}
                  onChange={(e) => setNewRecord({ ...newRecord, illness_name: e.target.value })}
                />
                <input
                  type="date"
                  value={newRecord.diagnosis_date}
                  onChange={(e) => setNewRecord({ ...newRecord, diagnosis_date: e.target.value })}
                />
                <textarea
                  placeholder="Treatment Details"
                  value={newRecord.treatment_details}
                  onChange={(e) => setNewRecord({ ...newRecord, treatment_details: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Town"
                  value={newRecord.town}
                  onChange={(e) => setNewRecord({ ...newRecord, town: e.target.value })}
                />
                <button type="button" onClick={handleAddRecord}>
                  Save Record
                </button>
              </form>

              {/* Close Button for Current Patient */}
              <button onClick={closeFormForCurrentPatient} className="close-form-btn">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default HealthRecordsList;
