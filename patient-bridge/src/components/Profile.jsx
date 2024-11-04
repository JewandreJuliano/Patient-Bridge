import React, { useState } from 'react';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null; // Get patient_id

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Handle confirm password state
  };

  const handleSaveChanges = async () => {
    if (patient.password && patient.password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    const updatedData = {
      fullName: patient.fullName || user.fullName,
      email: patient.email || user.email,
      phoneNumber: patient.phoneNumber || user.phoneNumber,
    };
  
    if (patient.password) {
      updatedData.password = patient.password; // Include password only if provided
    }
  
    try {
      const response = await axios.put(`http://localhost:5432/api/patients/${patient_id}`, updatedData);
      alert(response.data.message); // Display success message
  
      // Update local storage with new patient data
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      navigate('/patient-dashboard'); // Redirect after saving
    } catch (error) {
      console.error('Error saving patient details:', error);
      alert('Error saving patient details');
    }
  };
  
  
  const handleCancel = () => {
    navigate('/patient-dashboard');
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
        <h2>Edit Profile</h2>

        <div className="input-group">
          <div className="input-half">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              placeholder={user.fullName || 'Full name'}
              onChange={handleInputChange} // Update state on change
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={user.email || 'Email address'}
            onChange={handleInputChange} // Update state on change
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text" // Change input type to text for phone number
            id="phoneNumber"
            name="phoneNumber"
            placeholder={user.phoneNumber || 'Phone Number'}
            onChange={handleInputChange} // Update state on change
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange} // Update state on change
            placeholder="Enter new password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword" 
            value={confirmPassword} // Manage confirm password in state
            onChange={handleConfirmPasswordChange} // Handle confirm password changes
            placeholder="Confirm new password"
          />
        </div>

        <div className="button-group">
          <button type="button" className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
