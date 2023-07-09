import React from 'react';
import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import '../styles/SignUpPopUp.css';
import { auth } from '../firebase'; // Import only the auth module
import firebase from '../firebase';

const handleSignUpWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // Handle successful sign-in
      console.log('Sign-in successful:', result.user);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error('Sign-in error:', error);
    });
};

const SignUpPopup = ({ onSignUpWithEmail, onClose }) => {
  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          <FaGoogle className="icon" />
          Sign up with Google
        </button>
        <button className="mb-4" onClick={onSignUpWithEmail}>
          <FaEnvelope className="icon" />
          Sign up with Email
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
