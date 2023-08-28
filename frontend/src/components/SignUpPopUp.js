import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import handleGoogleSignUp from './GoogleSignUp'; // Make sure the import is correct
import handleEmailSignUp from './EmailSignUp';
import '../styles/SignUpPopUp.css';

const SignUpPopUp = ({ onClose, isButtonVisible }) => {
  const handleEmailSignUpClick = () => {
    const email = 'balasathya16@yahoo.com';
    const password = 'testjjjjjo';

    handleEmailSignUp(email, password);
  };

  const handleGoogleSignUpClick = () => {
    handleGoogleSignUp(onClose); // Call the appropriate function
  };

  return (
    <div id="signup-popup" className="signup-popup">
      <div className="popup-content">
        {isButtonVisible && (
          <button className="popup-button" onClick={handleGoogleSignUpClick}>
            <FontAwesomeIcon icon={faGoogle} className="icon" />
            Sign up with Google
          </button>
        )}
        <button className="popup-button" onClick={handleEmailSignUpClick}>
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
