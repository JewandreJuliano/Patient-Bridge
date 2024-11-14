import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    practiceName: '',
    practiceAddress: '',
    suburb: '',
    city: '',
    email: '',
    phoneNumber: '',
    specialty: '',
  });

  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const doctor_id = user ? user.doctor_id : null; 

  
  useEffect(() => {
    if (user) {
      setDoctor({
        practiceName: user.practiceName || '',
        practiceAddress: user.practiceAddress || '',
        suburb: user.suburb || '',
        city: user.city || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        specialty: user.specialty || '',
      });
    }
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: value 
    }));
  };

  const handleSaveChanges = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    const updatedData = {
      ...doctor,
      password: password || undefined, // Only send password if it is provided
      doctor_id, 
    };
  
    try {
      const response = await axios.put(`http://localhost:5432/api/update-doctor-profile`, updatedData); 
      alert(response.data.message);
  
      
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      navigate('/doctor-dashboard'); 
    } catch (error) {
      console.error('Error saving doctor details:', error);
      alert('Error saving doctor details');
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

      <div className="profile-container">
        <h2>Edit Profile</h2>

        <div className="input-group">
          <label htmlFor="practiceName">Practice Name</label>
          <input
            type="text"
            id="practiceName"
            name="practiceName"
            placeholder="Practice Name"
            value={doctor.practiceName}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="practiceAddress">Practice Address</label>
          <input
            type="text"
            id="practiceAddress"
            name="practiceAddress"
            placeholder="Practice Address"
            value={doctor.practiceAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="suburb">Suburb</label>
          <input
            type="text"
            id="suburb"
            name="suburb"
            placeholder="Suburb"
            value={doctor.suburb}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={doctor.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={doctor.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={doctor.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            placeholder="Specialty"
            value={doctor.specialty}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default DoctorProfile;
