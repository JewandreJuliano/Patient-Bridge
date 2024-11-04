import React, { useState } from 'react';
import '../styles/Medications.css';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Handle adding new medication
  const handleSaveMedication = () => {
    if (!name || !dosage || !time) return; // Basic validation

    if (editId !== null) {
      // Update existing medication
      setMedications(medications.map(med => 
        med.id === editId ? { id: editId, name, dosage, time } : med
      ));
      setEditId(null);
    } else {
      // Add new medication
      setMedications([...medications, { id: Date.now(), name, dosage, time }]);
    }

    // Clear form fields and hide the form
    setName("");
    setDosage("");
    setTime("");
    setShowForm(false); // Hide the form after saving a medication
  };

  // Handle deleting medication with confirmation
  const handleDeleteMedication = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medication?");
    if (confirmDelete) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  // Handle editing medication
  const handleEditMedication = (medication) => {
    setEditId(medication.id);
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
          <h1 className="title">Patient Bridge</h1>
        </div>
      </header>
      <h2>Your Medications</h2>
      <div className="app-container">
        
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
                <th>ID</th>
                <th>Name</th>
                <th>Dosage</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med) => (
                <tr key={med.id}>
                  <td>{med.id}</td>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.time}</td>
                  <td>
                    <button 
                      className="update-button" 
                      onClick={() => handleEditMedication(med)}
                    >
                      Update
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteMedication(med.id)}
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
