import React from 'react';
import { FaGoogle, FaFacebook, FaEnvelope } from 'react-icons/fa';
import '../styles/SignUpPopUp.css'; // Import the CSS file

const SignUpPopup = ({ onClose }) => {
  const handleSignUpWithGoogle = () => {
    // Implement sign-up with Google logic
  };

  const handleSignUpWithFacebook = () => {
    // Implement sign-up with Facebook logic
  };

  const handleSignUpWithEmail = () => {
    // Implement sign-up with Email logic
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          <FaGoogle className="icon" />
          Sign up with Google
        </button>
        <button className="mb-4" onClick={handleSignUpWithFacebook}>
          <FaFacebook className="icon" />
          Sign up with Facebook
        </button>
        <button className="mb-4" onClick={handleSignUpWithEmail}>
          <FaEnvelope className="icon" />
          Sign up with Email
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
