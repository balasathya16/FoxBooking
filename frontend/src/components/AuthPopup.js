import React, { useRef, useEffect } from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithPhone from './SignInWithPhone';
import SignUpWithEmail from './SignInWithEmail';
import '../styles/AuthPopup.css'; // Import the CSS file

const AuthPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="auth-popup-background" onClick={onClose}>
      <div className="auth-popup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <SignUpWithEmail />
        <SignInWithGoogle className="google-button" />
        <SignInWithPhone className="phone-button" />
      </div>
    </div>
  );
};

export default AuthPopup;
