import React from 'react';
import '../styles/Profile.css'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom'; // For handling navigation

const Profile = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to a previous page or dashboard (you can adjust this as needed)
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

        {/* Practice Name */}
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="practiceName">Practice Name</label>
            <input
              type="text"
              id="practiceName"
              placeholder="Enter practice name"
            />
          </div>
        </div>

        {/* Practice Address */}
        <div className="input-group">
          <label htmlFor="practiceAddress">Practice Address</label>
          <input
            type="text"
            id="practiceAddress"
            placeholder="Enter practice address"
          />
        </div>

        {/* Suburb */}
        <div className="input-group">
          <label htmlFor="suburb">Suburb</label>
          <input
            type="text"
            id="suburb"
            placeholder="Enter suburb"
          />
        </div>

        {/* City/Town */}
        <div className="input-group">
          <label htmlFor="town">Town/City</label>
          <input
            type="text"
            id="town"
            placeholder="Enter town/city"
          />
        </div>

        {/* Email Address */}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
          />
        </div>

        {/* Phone Number */}
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter phone number"
          />
        </div>

        {/* Specialty */}
        <div className="input-group">
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            id="specialty"
            placeholder="Enter specialty"
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
          />
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
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
