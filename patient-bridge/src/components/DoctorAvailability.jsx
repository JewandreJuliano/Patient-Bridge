import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DoctorAvailability.css';

const DoctorAvailability = ({ isOpen, onClose }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [editingDate, setEditingDate] = useState(null); // Track which date is being edited

    const addDate = () => {
        if (!selectedDate || !startTime || !endTime) {
            alert("Please select a date and specify start and end times.");
            return;
        }

        const dateString = selectedDate.toISOString().split('T')[0];
        const existingDate = availableDates.find(d => d.date === dateString);

        if (!existingDate) {
            setAvailableDates([...availableDates, { date: dateString, startTime, endTime }]);
            clearInputs();
        } else {
            alert(`Date ${dateString} is already added!`);
        }
    };

    const clearInputs = () => {
        setSelectedDate(null);
        setStartTime('');
        setEndTime('');
        setEditingDate(null); // Clear editing state
    };

    const removeDate = (dateString) => {
        setAvailableDates(availableDates.filter(d => d.date !== dateString));
    };

    const editDate = (dateString) => {
        const dateToEdit = availableDates.find(d => d.date === dateString);
        if (dateToEdit) {
            setSelectedDate(new Date(dateString));
            setStartTime(dateToEdit.startTime);
            setEndTime(dateToEdit.endTime);
            setEditingDate(dateString); // Set editing date
        }
    };

    const updateDate = () => {
        if (!editingDate || !startTime || !endTime) {
            alert("Please specify start and end times to update.");
            return;
        }

        const updatedDates = availableDates.map(d => {
            if (d.date === editingDate) {
                return { ...d, startTime, endTime };
            }
            return d;
        });
        setAvailableDates(updatedDates);
        clearInputs(); // Clear inputs after update
    };

    const handleSubmit = () => {
        console.log('Selected available dates:', availableDates);
        alert("Availability saved!");
        onClose(); // Close the modal after saving
    };

    return (
        isOpen && (
            <div className="popup-container">
                <div className="popup-content">
                <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
  X
</button>
                    <h2>Doctor Availability</h2>
                    <p>Select the dates you are available:</p>

                    <div className="date-time-container">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            highlightDates={availableDates.map(({ date }) => new Date(date))}
                        />
                        <div className="time-inputs">
                            <label>
                                Start Time:
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </label>
                            <label>
                                End Time:
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </label>
                            <button className="add-date-btn" onClick={editingDate ? updateDate : addDate}>
                                {editingDate ? 'Update Time' : 'Add Date'}
                            </button>
                        </div>
                    </div>

                    <div className="selected-dates">
                        {availableDates.map(({ date, startTime, endTime }) => (
                            <div key={date} className="date-item">
                                <span>{date} - {startTime} to {endTime}</span>
                                <button className='edit-btn'onClick={() => editDate(date)}>Edit</button>
                                <button className='remove-btn' onClick={() => removeDate(date)}>Remove</button>
                            </div>
                        ))}
                    </div>

                    <button className="save-btn" onClick={handleSubmit}>Save Availability</button>
                </div>
            </div>
        )
    );
};

export default DoctorAvailability;
