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
            <label htmlFor="fullname">Practice Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Full name"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="input-group">
          <label htmlFor="email">Practice Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Phone Number</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Specialty</label>
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

       

        {/* Save Changes Button */}
        <div>
          <button type="button">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
