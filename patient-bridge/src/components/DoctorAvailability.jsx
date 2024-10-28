import React, { useState } from 'react';
import '../styles/DoctorAvailability.css';

const DoctorAvailability = () => {
    const [availableDates, setAvailableDates] = useState([]);
    
    const toggleDate = (date) => {
        if (availableDates.includes(date)) {
            setAvailableDates(availableDates.filter(d => d !== date));
        } else {
            setAvailableDates([...availableDates, date]);
        }
    };

    const handleSubmit = () => {
        // Save the available dates to the database or server here
        console.log('Selected available dates:', availableDates);
        alert("Availability saved!");
    };

    const renderCalendar = () => {
        const today = new Date();
        const dates = Array.from({ length: 30 }, (_, i) => {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            return day;
        });

        return (
            <div className="calendar-grid">
                {dates.map((date) => {
                    const dateString = date.toISOString().split('T')[0];
                    const isSelected = availableDates.includes(dateString);
                    return (
                        <button
                            key={dateString}
                            className={`date-box ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleDate(dateString)}
                        >
                            {date.toDateString()}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="availability-container">
            <h2>Doctor Availability</h2>
            <p>Select the dates you are available:</p>
            {renderCalendar()}
            <button className="submit-btn" onClick={handleSubmit}>Save Availability</button>
        </div>
    );
};

export default DoctorAvailability;
