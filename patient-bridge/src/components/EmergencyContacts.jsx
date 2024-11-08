import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/EmergencyContacts.css';

const EmergencyContacts = ({ patientId }) => {
  const [contactName, setContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null; // Get patient_id

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const contactData = {
      patient_id: patient_id,
      contact_name: contactName,
      relationship,
      phone_number: phoneNumber,
      email,
    };

    try {
      const response = await fetch('http://localhost:5432/api/emergency-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Emergency contact saved:', result);
        setSuccessMessage('Emergency contact saved successfully!');
        setContactName('');
        setRelationship('');
        setPhoneNumber('');
        setEmail('');
        navigate('/patient-dashboard#!');
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Error saving emergency contact');
      }
    } catch (error) {
      setErrorMessage('Error submitting emergency contact');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/patient-dashboard'); // Navigate back to the patient dashboard
  };

  return (
    <div className="dashboard"> 
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
      </header>

      <div className="profile-container"> 
        <h2>EMERGENCY CONTACT</h2>
        <p>Please enter your emergency contact's information below</p>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <label htmlFor="emergencyFullName">FULL NAME</label>
          <input
            type="text"
            id="emergencyFullName"
           
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="emergencyRelationship">RELATIONSHIP</label>
          <input
            type="text"
            id="emergencyRelationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="emergencyPhone">PHONE NUMBER</label>
          <input
            type="tel"
            id="emergencyPhone"
                       value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="emergencyEmail">EMAIL</label>
          <input
            type="email"
            id="emergencyEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="button-container">
  <button type="button" onClick={handleSaveChanges} disabled={isLoading}>
    {isLoading ? 'Saving...' : 'SAVE CHANGES'}
  </button>
  <button type="button" onClick={handleCancel} disabled={isLoading}>
    CANCEL
  </button>
</div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
