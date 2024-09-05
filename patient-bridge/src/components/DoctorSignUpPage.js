import React, { useState } from 'react';
import '../styles/DoctorSignUpPage.css'; // Import CSS file for styling

const DoctorSignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        practiceName: '',
        practiceAddress: '',
        phoneNumber: '',
        specialty: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Doctor Signup Data:', formData);
    };

    return (
        <div className="doctor-signup-page">
            <header className="header">
                <h1 className="title">Doctor/Practice Sign Up</h1>
            </header>
            <main className="main-content">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="practiceName">Practice Name</label>
                        <input
                            type="text"
                            id="practiceName"
                            name="practiceName"
                            value={formData.practiceName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="practiceAddress">Practice Address</label>
                        <input
                            type="text"
                            id="practiceAddress"
                            name="practiceAddress"
                            value={formData.practiceAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty</label>
                        <input
                            type="text"
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                
            </main>
            <footer className="signup-footer">
                <p>Already have an account? <a href="/login">Log in here</a></p>
            </footer>
            <footer className="footer">
                <p>© 2024 Patient Bridge. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DoctorSignUpPage;
