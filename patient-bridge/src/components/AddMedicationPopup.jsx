// src/components/AddMedicationPopup.js
import React, { useState, useEffect } from 'react';
import '../styles/AddMedicationPopup.css';

const AddMedicationPopup = ({ isOpen, onClose, onSave, medication }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [timeOfDay, setTimeOfDay] = useState([]);

  useEffect(() => {
    // If editing a medication, populate the fields with its data
    if (medication) {
      setMedicationName(medication.medicationName);
      setDosage(medication.dosage);
      setTimesPerDay(medication.timesPerDay);
      setTimeOfDay(medication.timeOfDay);
    } else {
      // Reset fields if adding a new medication
      setMedicationName('');
      setDosage('');
      setTimesPerDay('');
      setTimeOfDay(['']);
    }
  }, [medication]);

  const handleTimesPerDayChange = (e) => {
    const value = parseInt(e.target.value);
    setTimesPerDay(value);
    setTimeOfDay(Array(value).fill('')); // Create an array of empty strings based on `timesPerDay`
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...timeOfDay];
    updatedTimes[index] = value;
    setTimeOfDay(updatedTimes);
  };

  const handleSave = () => {
    if (medicationName && dosage && timesPerDay && timeOfDay.every(time => time)) {
      onSave({ medicationName, dosage, timesPerDay, timeOfDay });
      onClose();
      setMedicationName('');
      setDosage('');
      setTimesPerDay('');
      setTimeOfDay(['']);
    }
  };

  return (
    isOpen && (
      <div className="add-medication-popup-container">
        <div className="add-medication-popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>{medication ? 'Edit Medication' : 'Add Medication'}</h2>
          <form>
            <input
              type="text"
              placeholder="Medication Name"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Times per Day"
              value={timesPerDay}
              onChange={handleTimesPerDayChange}
            />
            {timeOfDay.map((time, index) => (
              <input
                key={index}
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                placeholder={`Time ${index + 1}`}
              />
            ))}
            <button type="button" onClick={handleSave} className="save-btn">
              Save Medication
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddMedicationPopup;
