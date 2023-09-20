import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import '../styles/AuthPopup.css'

const AuthPopup = ({ onClose }) => {
  return (
    <div className="auth-popup">
      <SignInWithGoogle />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthPopup;
