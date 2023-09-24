import React, { useRef, useEffect } from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithPhone from './SignInWithPhone';
import SignUpWithEmail from './SignInWithEmail';
import '../styles/AuthPopup.css'; // Update import to use lowercase

const AuthPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="auth-popup-background" onClick={onClose}>
      <div className="auth-popup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <SignUpWithEmail />
        <SignInWithGoogle />
        <SignInWithPhone className="phone-button" />
      </div>
    </div>
  );
};

export default AuthPopup;
