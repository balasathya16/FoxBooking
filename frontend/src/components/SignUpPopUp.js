import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import faTimes icon
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import handleGoogleSignUp from './GoogleSignUp';
import handleEmailSignUp from './EmailSignUp';
import '../styles/SignUpPopUp.css';

const SignUpPopUp = ({ onClose }) => {
  const handleEmailSignUpClick = () => {
    const email = 'balasathya16@yahoo.com'; // Replace with your email input value
    const password = 'testjjjjjo'; // Replace with your password input value

    handleEmailSignUp(email, password);
  };

  return (
    <div id="signup-popup" className="signup-popup">
      <div className="popup-content">
        <h3>Sign up NOW</h3>
        <button className="popup-button" onClick={handleGoogleSignUp}>
          <FontAwesomeIcon icon={faGoogle} className="icon" />
          Sign up with Google
        </button>
        <button className="popup-button" onClick={handleEmailSignUpClick}>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          Sign up with Email
        </button>
        <button className="popup-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="icon" /> {/* Use faTimes icon for Close */}
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpPopUp;
