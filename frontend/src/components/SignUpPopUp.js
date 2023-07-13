import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import handleGoogleSignUp from './GoogleSignUp'; // Import the handleGoogleSignUp function
import handleEmailSignUp from './EmailSignUp'; // Import the handleEmailSignUp function
import '../styles/SignUpPopUp.css';

const SignUpPopUp = ({ onClose }) => {
  const handleEmailSignUpClick = () => {
    const email = 'balasathya16@yahoo.com'; // Replace with your email input value
    const password = 'test'; // Replace with your password input value

    handleEmailSignUp(email, password);
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
        <button className="popup-button" onClick={handleEmailSignUpClick}>
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
