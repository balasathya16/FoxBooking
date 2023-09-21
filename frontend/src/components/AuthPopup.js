import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithPhone from './SignInWithPhone';
import SignUpWithEmail from './SignInWithEmail';
import '../styles/AuthPopup.css'; // Import the CSS file

const AuthPopup = ({ onClose }) => {
  return (
    <div className="auth-popup-background">
      <div className="auth-popup">
        <SignInWithPhone />
        <SignUpWithEmail />
        <SignInWithGoogle />

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthPopup;
