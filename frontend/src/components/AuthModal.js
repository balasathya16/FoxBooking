import React from 'react';
import SignUpWithEmail from './SignUpWithEmail'; // Import your authentication components
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithPhone from './SignInWithPhone';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="auth-options">
        <SignUpWithEmail />
        <SignInWithGoogle />
        <SignInWithPhone />
      </div>
    </div>
  );
};

export default AuthModal;
