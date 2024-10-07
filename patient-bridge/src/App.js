import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PatientSignUpPage from './components/PatientSignUpPage';
import DoctorSignUpPage from './components/DoctorSignUpPage';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PrescriptionPopup from './components/PrescriptionPopup';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup/patient" element={<PatientSignUpPage />} />
                <Route path="/signup/doctor" element={<DoctorSignUpPage />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path ="/patient-dashboard" element={<PatientDashboard/>}/>
                <Route path="/doctor-dashboard"element={<DoctorDashboard/>}/>
                
                
            </Routes>
        </Router>
    );
};

export default App;