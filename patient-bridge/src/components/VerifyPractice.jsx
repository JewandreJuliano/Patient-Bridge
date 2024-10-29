import React, { useState } from 'react';
import '../styles/VerifyPractice.css';

const VerifyPractice = ({ isOpen, onClose }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleSave = () => {
    if (pdfFile) {
      // Logic to save or upload the file
      console.log("File saved:", pdfFile);
    } else {
      alert("Please upload a file before saving.");
    }
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>Verify Practice</h2>
          <p>Please upload proof of your practice below</p>
          
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
          />
          
          <button className="save-btn" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    )
  );
};

export default VerifyPractice;
