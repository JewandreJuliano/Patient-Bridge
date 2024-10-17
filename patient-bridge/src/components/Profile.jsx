import React from 'react';
import '../styles/Profile.css'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom'; // For handling navigation

const Profile = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to a previous page (adjust as necessary)
    navigate('/doctor-dashboard');
  };

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

        {/* Confirm Password */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>

        {/* Buttons: Save Changes and Cancel */}
        <div className="button-group">
          <button type="button" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
