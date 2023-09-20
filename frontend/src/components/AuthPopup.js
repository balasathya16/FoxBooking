import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';

const AuthPopup = ({ onClose }) => {
  return (
    <div className="auth-popup">
      <h2>Sign Up</h2>
      <SignInWithGoogle />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthPopup;
