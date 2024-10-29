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
import Profile from './components/Profile';
import DoctorProfile from './components/DoctorProfile'
import EmergencyContacts from './components/EmergencyContacts';
import DoctorAvailability from './components/DoctorAvailability';
import HelpPage from './components/HelpPage';

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
        <Route path="/medication" element={<PrescriptionPopup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor-profile" element={<DoctorProfile/>} />
        <Route path="/emergency-contact" element={<EmergencyContacts />} />
        <Route path="/doctor-avail" element={<DoctorAvailability />} />
        <Route path="/help-page" element={<HelpPage />} />
        
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
