import React from 'react';
import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import '../styles/SignUpPopUp.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase';

const SignUpPopup = ({ onClose }) => {
  const handleSignUpWithGoogle = () => {
    // ... handle sign up with Google logic
  };

  const handleSignUpWithEmail = () => {
    // ... handle sign up with email logic
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          <FaGoogle className="icon" />
          Sign up with Google
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
