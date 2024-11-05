import React, { useState, useEffect } from 'react';
import '../styles/Medications.css';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null; // Get patient_id

  useEffect(() => {
    const fetchMedications = async () => {
      const response = await fetch(`http://localhost:5432/api/medications/${patient_id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log to confirm medication_id is present
        setMedications(data);
      } else {
        console.error('Error fetching medications');
      }
    };
    fetchMedications();
  }, [patient_id]);
  

  // Handle adding or updating medication
  const handleSaveMedication = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true); // Start loading
  
    if (!name || !dosage || !time || !patient_id) {
      setErrorMessage('Please fill in all fields.'); // Basic validation
      setIsLoading(false); // Stop loading
      return;
    }
  
    const medicationData = {
      patient_id: patient_id, // Use patient_id from localStorage
      name,
      dosage,
      time,
    };
  
    try {
      if (editIndex !== null) {
        // Update existing medication
        const medication = medications[editIndex];
        const response = await fetch(`http://localhost:5432/api/medications/${medication.medication_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicationData),
        });
  
        if (response.ok) {
          const updatedMedication = await response.json();
          setMedications(medications.map((med, index) => 
            index === editIndex ? updatedMedication : med
          ));
          setSuccessMessage('Medication updated successfully!');
          setEditIndex(null);
        } else {
          const error = await response.json();
          setErrorMessage(error.error || 'Error updating medication');
        }
      } else {
        // Create new medication
        const response = await fetch('http://localhost:5432/api/add-medications', { // Ensure the correct API route is used
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicationData),
        });
  
        if (response.ok) {
          const newMedication = await response.json();
          setMedications([...medications, newMedication]);
          setSuccessMessage('Medication added successfully!');
        } else {
          const error = await response.json();
          setErrorMessage(error.error || 'Error adding medication');
        }
      }
  
      // Clear form fields after saving
      setName('');
      setDosage('');
      setTime('');
      setShowForm(false); // Hide the form after saving a medication
    } catch (error) {
      setErrorMessage('Error saving medication');
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  

  // Handle deleting medication with confirmation
  const handleDeleteMedication = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medication?");
    if (confirmDelete) {
      const medication = medications[index];
      fetch(`http://localhost:5432/api/medications/${medication.medication_id}`, {
        method: 'DELETE',
      }).then(response => {
        if (response.ok) {
          setMedications(medications.filter((_, i) => i !== index));
        } else {
          alert('Error deleting medication - Please refresh the page');
        }
      });
    }
  };

  // Handle editing medication
  const handleEditMedication = async (index) => {
    const medication = medications[index];
    setEditIndex(index);
    setName(medication.name);
    setDosage(medication.dosage);
    setTime(medication.time);
    setShowForm(true); // Show form when editing
  
  };

  return (
    <>
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
      </header>
      <h2> Your Medications</h2>
      <div className="app-container">

        {isLoading && <p>Loading...</p>} {/* Loading indicator */}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}

        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            Add Medication
          </button>
        )}

        {showForm && (
          <div className="form-container">
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Dosage" 
              value={dosage} 
              onChange={(e) => setDosage(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
            <button onClick={handleSaveMedication}>
              Save Medication
            </button>
          </div>
        )}

        {medications.length === 0 ? (
          <p className="no-medications-message">No medications added yet. Start by adding one above.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, index) => (
                <tr key={index}>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.time}</td>
                  <td>
                    <button 
                      className="update-button" 
                      onClick={() => handleEditMedication(index)}
                    >
                      Update
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteMedication(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Medications;
