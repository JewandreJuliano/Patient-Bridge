// Medications.js
import React, { useState } from 'react';
import '../styles/Medications.css';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddMedication = () => {
    if (!name || !dosage || !time) return;

    if (editId !== null) {
      setMedications(medications.map(med => 
        med.id === editId ? { id: editId, name, dosage, time } : med
      ));
      setEditId(null);
    } else {
      setMedications([...medications, { id: Date.now(), name, dosage, time }]);
    }

    setName("");
    setDosage("");
    setTime("");
    setShowForm(false);
  };

  const handleDeleteMedication = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medication?");
    if (confirmDelete) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const handleEditMedication = (medication) => {
    setEditId(medication.id);
    setName(medication.name);
    setDosage(medication.dosage);
    setTime(medication.time);
    setShowForm(true);
  };

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENTBRIDGE</h1>
        </div>
      </header>
      <h2>Your Medications</h2>
      <div className="app-container">
        <div className="toolbar">
          <button onClick={() => setShowForm(true)}>Add Medication</button>
          <input 
            type="text" 
            placeholder="Search medications" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="search-bar"
          />
        </div>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowForm(false)}>&times;</span>
              <input 
                type="text" 
                placeholder="Medication Name" 
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
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="time-input"
              />
              <button onClick={handleAddMedication}>
                {editId !== null ? "Update" : "Add"} Medication
              </button>
            </div>
          </div>
        )}

        {filteredMedications.length === 0 ? (
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
              {filteredMedications.map((med) => (
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
                      ✏️
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteMedication(med.id)}
                    >
                      🗑️
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
