import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PatientSignUpPage from './components/PatientSignUpPage';
import DoctorSignUpPage from './components/DoctorSignUpPage';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PrescriptionPopup from './components/PrescriptionPopup';
import TrackMedicationPage from './components/TrackMedicationPage';
import BookAppointment from './components/BookAppointment';

const App = () => {
  // State to manage the medications across different components
  const [medications, setMedications] = useState([]);

  const handleSaveMedication = (medication) => {
    // Save medication in the state
    setMedications([...medications, medication]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/patient" element={<PatientSignUpPage />} />
        <Route path="/signup/doctor" element={<DoctorSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/book-apt" element={<BookAppointment/>} />
        
        {/* Prescription Popup Route (can be used in patient dashboard or standalone) */}
        <Route
          path="/prescriptions"
          element={
            <PrescriptionPopup
              isOpen={true}
              onClose={() => {}}
              medications={medications}
              onSave={handleSaveMedication}
            />
          }
        />

        {/* Track Medication Route */}
        <Route
          path="/track-medications"
          element={<TrackMedicationPage medications={medications} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
