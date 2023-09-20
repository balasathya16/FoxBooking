import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import '../styles/AuthPopup.css'; // Import the CSS file

const AuthPopup = ({ onClose }) => {
  return (
    <div className="auth-popup-background">
      <div className="auth-popup">
        <SignInWithGoogle />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthPopup;
