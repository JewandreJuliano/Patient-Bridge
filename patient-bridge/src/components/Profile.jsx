import React from 'react';
import '../styles/Profile.css'; // Make sure to import the CSS file

const Profile = () => {
  return (
    <div className="dashboard"> {/* Added a parent container for the dashboard */}
      <header className="dashboard-header"> {/* Header section */}
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
      </header>

      <div className="profile-container"> {/* Profile container */}
        <h2>Edit Profile</h2>

        {/* Full Name */}
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Full name"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <h3>Emergency Contact</h3>

        {/* Emergency Contact Full Name */}
        <div className="input-group">
          <label htmlFor="emergencyFullName">Full Name</label>
          <input
            type="text"
            id="emergencyFullName"
            placeholder="Full name"
          />
        </div>

        {/* Emergency Contact Details */}
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

        {/* Save Changes Button */}
        <div>
          <button type="button">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
