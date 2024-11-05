import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css'; // Assuming CSS file is already imported

const ForgotPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.put('http://localhost:5432/api/forgot-password', {
                email,
                newPassword,
            });

            alert(response.data.message);
            onClose(); // Close the forgot password form on success
        } catch (error) {
            console.error('Error resetting password:', error);
            alert(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        isOpen && (
            <div className="forgot-password-popup-container">
                <div className="forgot-password-popup-content">
                <button style={{ fontSize: '10px', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
  X
</button>
                    <p className="forgot-password-title">RESET YOUR PASSWORD</p>
                    <p className="forgot-password-message">Enter your email and a new password below</p>
                    <form className="forgot-password-form">
                        <div className="form-group">
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">NEW PASSWORD</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">CONFIRM NEW PASSWORD</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="button" onClick={handleResetPassword} className="forgot-password-btn">RESET PASSWORD</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default ForgotPassword;
