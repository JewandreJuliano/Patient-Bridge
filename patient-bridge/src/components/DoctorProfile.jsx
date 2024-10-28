import React, { useState } from 'react';
import '../styles/Profile.css'; 
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    practiceName: '',
    practiceAddress: '',
    suburb: '',
    town: '',
    email: '',
    phoneNumber: '',
    specialty: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data here if needed
    const response = await fetch('/api/update-doctor-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle successful response
      console.log('Profile updated successfully!');
      navigate('/doctor-dashboard');
    } else {
      // Handle error response
      console.error('Error updating profile');
    }
  };

  const handleCancel = () => {
    navigate('/doctor-dashboard');
  };

  return (
    <div className="dashboard"> 
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">Patient Bridge</h1>
        </div>
      </header>

      <form className="profile-container" onSubmit={handleSubmit}> 
        <h2>Edit Profile</h2>

        {Object.keys(formData).map((key) => (
          <div className="input-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={key === 'password' || key === 'confirmPassword' ? 'password' : 'text'}
              id={key}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="button-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
