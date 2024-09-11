import React, { useState } from 'react';
import '../styles/PrescriptionPopup.css';

const PrescriptionPopup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>Prescriptions</h2>
          <div id="medications-list">
            <p>No medications added yet</p> {/* Placeholder for no medications */}
          </div>
          <button className="add-medication-btn">
            + Add Medication
          </button>
        </div>
      </div>
    )
  );
};

export default PrescriptionPopup;
