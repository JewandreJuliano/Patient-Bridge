import React, { useState } from 'react';
import '../styles/EmergencyContacts.css'; // Make sure to import the CSS file

const EmergencyContacts = ({ patientId }) => {
  const [contactName, setContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveChanges = async () => {
    const contactData = {
      patient_id: patientId,  // Make sure to pass the patient's ID
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
        // Optionally reset the form fields or show a success message
      } else {
        const error = await response.json();
        console.error('Error saving emergency contact:', error);
        // Handle error case, e.g., show a message to the user
      }
    } catch (error) {
      console.error('Error submitting emergency contact:', error);
    }
  };

  return (
    <div className="dashboard"> 
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
      </header>

      <div className="profile-container"> 
        <h2>Emergency Contact</h2>

        <div className="input-group">
          <label htmlFor="emergencyFullName">Full Name</label>
          <input
            type="text"
            id="emergencyFullName"
            placeholder="Full name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="emergencyRelationship">Relationship</label>
          <input
            type="text"
            id="emergencyRelationship"
            placeholder="Relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-half">
            <label htmlFor="emergencyPhone">Phone Number</label>
            <input
              type="tel"
              id="emergencyPhone"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="emergencyEmail">Email Address</label>
          <input
            type="email"
            id="emergencyEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button type="button" onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
