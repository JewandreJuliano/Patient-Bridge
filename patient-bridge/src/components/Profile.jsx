import React, { useEffect, useState } from 'react';
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
  const patientId = 1; // Replace this with the actual patient ID from your state management or context

  // Fetch patient details when the component mounts
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5432/api/patients/${patientId}`);
        setPatient(response.data); // Set the patient details to state
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5432/api/patients/${patientId}`, patient);
      alert(response.data.message); // Display success message
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
              value={patient.fullName}
              onChange={handleInputChange} // Update state on change
              placeholder="Full name"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={patient.email}
            onChange={handleInputChange} // Update state on change
            placeholder="Email address"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={patient.password}
            onChange={handleInputChange} // Update state on change
            placeholder="Enter your password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
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
