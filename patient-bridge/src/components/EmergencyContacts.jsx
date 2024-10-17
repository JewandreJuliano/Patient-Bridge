import React from 'react';
import '../styles/EmergencyContacts.css'; // Make sure to import the CSS file

const EmergencyContacts = () => {
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
          />
        </div>

        <div className="input-group">
          <div className="input-half">
            <label htmlFor="emergencyPhone">Phone Number</label>
            <input
              type="tel"
              id="emergencyPhone"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="input-group">
            <label htmlFor="emergencyRelationship">Relationship</label>
            <input
              type="text"
              id="emergencyRelationship"
              placeholder="Relationship"
            />
          </div>

        {/* Emergency Contact Email */}
        <div className="input-group">
          <label htmlFor="emergencyEmail">Email Address</label>
          <input
            type="email"
            id="emergencyEmail"
            placeholder="Email"
          />
        </div>

        <div>
          <button type="button">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
