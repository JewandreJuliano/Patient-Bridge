import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DoctorAvailability.css';

const DoctorAvailability = ({ isOpen, onClose }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const addDate = (date) => {
        const dateString = date.toISOString().split('T')[0];
        if (!availableDates.includes(dateString)) {
            setAvailableDates([...availableDates, dateString]);
        }
    };

    const removeDate = (dateString) => {
        setAvailableDates(availableDates.filter(d => d !== dateString));
    };

    const handleSubmit = () => {
        console.log('Selected available dates:', availableDates);
        alert("Availability saved!");
    };

    return (
        isOpen && (
            <div className="popup-container">
                <div className="popup-content">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <h2>Doctor Availability</h2>
                    <p>Select the dates you are available:</p>

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            addDate(date);
                        }}
                        inline
                        highlightDates={availableDates.map(date => new Date(date))}
                    />

                    <div className="selected-dates">
                        {availableDates.map(date => (
                            <div key={date} className="date-item">
                                <span>{date}</span>
                                <button onClick={() => removeDate(date)}>Remove</button>
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
