import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmergencyContacts.css';

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddOrUpdateContact = () => {
    // Validation for required fields
    if (!contactName || !relationship || !phoneNumber) {
      setErrorMessage('Please fill in the Full Name, Relationship, and Phone Number.');
      return;
    }

    // Validation for phone number (only digits)
    const phoneRegex = /^[0-9]+$/; // Only allow digits
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Phone Number can only contain digits.');
      return;
    }

    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (email && !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address (format: user@domain.com).');
      return;
    }

    setErrorMessage('');

    if (editId !== null) {
      setContacts(contacts.map(contact => 
        contact.id === editId ? { id: editId, contactName, relationship, phoneNumber, email } : contact
      ));
      setEditId(null);
    } else {
      setContacts([...contacts, { id: Date.now(), contactName, relationship, phoneNumber, email }]);
    }

    // Reset form fields
    setContactName('');
    setRelationship('');
    setPhoneNumber('');
    setEmail('');
    setShowForm(false);
  };

  const handleDeleteContact = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleEditContact = (contact) => {
    setEditId(contact.id);
    setContactName(contact.contactName);
    setRelationship(contact.relationship);
    setPhoneNumber(contact.phoneNumber);
    setEmail(contact.email);
    setShowForm(true);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.contactName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveContacts = () => {
    console.log('Emergency Contacts:', contacts);
    alert("Emergency contacts saved!");
    // Here you would typically send the contacts to your backend or local storage
  };

  return (
    <>
      <header className="dashboard-header"> 
        <div className="logo-title">
          <img src="/assets/patient-bridge-icon.png" alt="Company Icon" className="icon" />
          <h1 className="title">PATIENT BRIDGE</h1>
        </div>
      </header>
      <h2>Your Emergency Contacts</h2>
      <div className="app-container">
        <div className="toolbar">
          <button onClick={() => setShowForm(true)}>Add Contact</button>
          <input 
            type="text" 
            placeholder="Search contacts" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="em-search-bar"
          />
        </div>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowForm(false)}>&times;</span>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input 
                type="text" 
                placeholder="Full Name" 
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Relationship" 
                value={relationship} 
                onChange={(e) => setRelationship(e.target.value)} 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button onClick={handleAddOrUpdateContact}>
                {editId !== null ? "Update" : "Add"} Contact
              </button>
            </div>
          </div>
        )}

        {filteredContacts.length === 0 ? (
          <p className="no-contacts-message">No emergency contacts added yet. Start by adding one above.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Relationship</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.contactName}</td>
                  <td>{contact.relationship}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>
                    <button 
                      className="update-button" 
                      onClick={() => handleEditContact(contact)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {/* Save Contacts button */}
        <div className="bottom-left-corner">
          <button onClick={handleSaveContacts} className="save-contacts-button">Save Contacts</button>
          <button onClick={() => navigate('/patient-dashboard')} className="back-button">Back to Dashboard</button>
        </div>
      </div>
    </>
  );
};

export default EmergencyContacts;
