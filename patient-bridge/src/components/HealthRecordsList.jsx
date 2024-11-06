import React, { useState } from 'react';
import '../styles/HealthRecordsList.css';

const HealthRecordsList = ({ isOpen, onClose }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [newRecord, setNewRecord] = useState({
    procedure: '',
    visit_date: '',
    notes: '',
    dentist_name: ''
  });

  // Hardcoded patient data
  const patients = [
    { id: 1, patientName: 'John Doe' },
    { id: 2, patientName: 'Jane Smith' },
    { id: 3, patientName: 'Emily Davis' },
  ];

  // Hardcoded dental records associated with each patient
  const dentalRecordsData = {
    1: [
      { record_id: 1, procedure: 'Tooth Extraction', visit_date: '2023-07-12', notes: 'Successful extraction of upper molar.', dentist_name: 'SmileHub' },
      { record_id: 2, procedure: 'Teeth Cleaning', visit_date: '2023-08-05', notes: 'Routine cleaning; no issues.', dentist_name: 'SmileHub' },
    ],
    2: [
      { record_id: 3, procedure: 'Cavity Filling', visit_date: '2023-06-20', notes: 'Filled two small cavities.', dentist_name: 'SmileHub' },
    ],
    3: [
      { record_id: 4, procedure: 'Root Canal', visit_date: '2023-09-10', notes: 'Completed root canal on lower left molar.', dentist_name: 'SmileHub' },
    ],
  };

  // Retrieve health records for the selected patient
  const dentalRecords = selectedPatientId ? dentalRecordsData[selectedPatientId] : [];

  // Handle patient selection
  const handlePatientClick = (id) => {
    setSelectedPatientId(id);
  };

  // Handle adding a new dental record (for demonstration, only updates local state)
  const handleAddRecord = () => {
    if (!newRecord.procedure || !newRecord.visit_date || !newRecord.notes || !newRecord.dentist_name) return;

    const newRecordData = {
      ...newRecord,
      record_id: Date.now(), // Unique ID for new record
    };
    
    // Add the new record to the hardcoded dental records for this patient
    dentalRecordsData[selectedPatientId].push(newRecordData);
    setNewRecord({ procedure: '', visit_date: '', notes: '', dentist_name: '' });
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
                      {patient.patientName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3>Health Records for {patients.find((p) => p.id === selectedPatientId)?.patientName}</h3>
              <button onClick={() => setSelectedPatientId(null)}>Back to Patient List</button>

              {/* Form for adding new dental records */}
              <div className="dental-record-form">
                <h4>Add New Health Record</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <label>
                    Procedure:
                    <input
                      type="text"
                      value={newRecord.procedure}
                      onChange={(e) => setNewRecord({ ...newRecord, procedure: e.target.value })}
                      placeholder="Procedure"
                    />
                  </label>
                  <label>
                    Visit Date:
                    <input
                      type="date"
                      value={newRecord.visit_date}
                      onChange={(e) => setNewRecord({ ...newRecord, visit_date: e.target.value })}
                    />
                  </label>
                  <label>
                    Notes:
                    <textarea
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                      placeholder="Notes"
                    />
                  </label>
                  <label>
                    Dentist Name:
                    <input
                      type="text"
                      value={newRecord.dentist_name}
                      onChange={(e) => setNewRecord({ ...newRecord, dentist_name: e.target.value })}
                      placeholder="Dentist Name"
                    />
                  </label>
                  <button type="button" onClick={handleAddRecord}>
                    Save Record
                  </button>
                </form>
              </div>

              {/* Display list of dental records */}
              <div id="dental-records-list">
                {dentalRecords.length > 0 ? (
                  <ul>
                    {dentalRecords.map((record) => (
                      <li key={record.record_id} className="record-item">
                        <strong>{record.procedure}</strong> - {record.notes} <em>({record.visit_date})</em> - <span>Dentist: {record.dentist_name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No dental records found for this patient.</p>
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
