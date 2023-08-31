import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../styles/SignUpPopUp.css';

const SignUpPopUp = ({ onEmailSignUp, onGoogleSignUp, onClose }) => {
  return (
    <div id="signup-popup" className="signup-popup">
      <div className="popup-content">
        <button className="popup-button" onClick={onGoogleSignUp}>
          <FontAwesomeIcon icon={faGoogle} className="icon" />
          Sign up with Google
        </button>
        <button className="popup-button" onClick={onEmailSignUp}>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          Sign up with Email
        </button>
        <button className="popup-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="icon" />
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpPopUp;
