import React, { useState } from 'react';
import '../styles/NotificationPref.css';

const NotificationPref = ({ isOpen, onClose }) => {
    const [notificationMethod, setNotificationMethod] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Notification preference saved: ${notificationMethod}`);
        alert(`Your preference for ${notificationMethod} notifications has been saved.`);
    };

    return (
        <>
            {isOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        <button
                            className="close-btn"
                            onClick={onClose}
                        >
                            X
                        </button>
                        <p className="notification-title">NOTIFICATION PREFERENCES</p>
                        <p>Please select your choice of notification method</p>
                        <form className="notification-form" onSubmit={handleSubmit}>
                            <div className="notif-form-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="notification"
                                        value="Email"
                                        checked={notificationMethod === 'Email'}
                                        onChange={(e) => setNotificationMethod(e.target.value)}
                                        required
                                    />
                                    Email
                                </label>
                            </div>
                            <div className="notif-form-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="notification"
                                        value="SMS"
                                        checked={notificationMethod === 'SMS'}
                                        onChange={(e) => setNotificationMethod(e.target.value)}
                                        required
                                    />
                                    SMS
                                </label>
                            </div>
                            <button type="submit" className="save-btn">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationPref;
