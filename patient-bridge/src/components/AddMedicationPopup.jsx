import React, { useState, useEffect } from 'react';
import '../styles/AddMedicationPopup.css';

const AddMedicationPopup = ({ isOpen, onClose, onSave, medication, patientId }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [timeOfDay, setTimeOfDay] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (medication) {
      setMedicationName(medication.medication_name);
      setDosage(medication.dosage);
      setTimesPerDay(medication.times_per_day);
      setTimeOfDay(medication.time_of_day);
    } else {
      setMedicationName('');
      setDosage('');
      setTimesPerDay('');
      setTimeOfDay(['']);
    }
  }, [medication]);

  const handleTimesPerDayChange = (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value);
    setTimesPerDay(value);
    setTimeOfDay(Array(value).fill(''));
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...timeOfDay];
    updatedTimes[index] = value;
    setTimeOfDay(updatedTimes);
  };

  const handleSave = async () => {
    if (medicationName && dosage && timesPerDay && timeOfDay.every(time => time)) {
      const medicationData = {
        patient_id: patientId,
        medication_name: medicationName,
        dosage,
        times_per_day: timesPerDay,
        time_of_day: timeOfDay,
      };

      try {
        const response = await fetch(
          medication ? `http://localhost:5432/api/medications/${medication.medication_id}` : 'http://localhost:5432/api/medications',
          {
            method: medication ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicationData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log('Medication saved:', result);
          setMessage('Medication saved successfully!');
          setMessageType('success');
          onSave(medicationData);
          onClose();

          setMedicationName('');
          setDosage('');
          setTimesPerDay('');
          setTimeOfDay(['']);
        } else {
          const error = await response.json();
          console.error('Error saving medication:', error);
          setMessage('Error saving medication. Please try again.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error submitting medication:', error);
        setMessage('Error submitting medication. Please check your connection.');
        setMessageType('error');
      }
    } else {
      setMessage('Please fill in all fields.');
      setMessageType('error');
    }
  };

  return (
    isOpen && (
      <div className="add-medication-popup-container">
        <div className="add-medication-popup-content">
          <button className="close-btn" onClick={onClose}>X</button>
          <h2>{medication ? 'Edit Medication' : 'Add Medication'}</h2>
          {message && <div className={`message ${messageType}`}>{message}</div>}
          <form>
            <input type="text" placeholder="Medication Name" value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
            <input type="text" placeholder="Dosage (e.g., 500mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            <input type="number" min="1" placeholder="Times per Day" value={timesPerDay} onChange={handleTimesPerDayChange} />
            {timeOfDay.map((time, index) => (
              <input
                key={index}
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                placeholder={`Time ${index + 1}`}
              />
            ))}
            <button type="button" onClick={handleSave} className="save-btn">Save Medication</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddMedicationPopup;
