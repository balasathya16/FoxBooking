import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import '../styles/SignUpPopUp.css';

const SignUpPopUp = ({ onClose }) => {
  const handleGoogleSignUp = () => {
    // Implement Google sign up functionality
    // ...
  };

  const handleEmailSignUp = () => {
    // Implement email sign up functionality
    // ...
  };

  const handlePhoneSignUp = () => {
    // Implement phone sign up functionality
    // ...
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <h3>Sign up</h3>
        <button className="popup-button" onClick={handleGoogleSignUp}>
          <FontAwesomeIcon icon={faGoogle} className="icon" />
          Sign up with Google
        </button>
        <button className="popup-button" onClick={handleEmailSignUp}>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          Sign up with Email
        </button>
        <button className="popup-button" onClick={handlePhoneSignUp}>
          <FontAwesomeIcon icon={faPhone} className="icon" />
          Sign up with phone number
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpPopUp;
