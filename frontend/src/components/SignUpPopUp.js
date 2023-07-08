import React, { useState } from 'react';
import GetStartedButton from './HomePage/GetStartedButton';
import SignUpPopup from './SignUpPopUp';
import '../styles/AnimatedText.css';
import { auth } from '../firebase'; // Import the auth instance from firebase.js

const AnimatedText = () => {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleGetStarted = () => {
    setShowSignUpPopup(true);
  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const handleSignUpWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
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

  const handleSignUpWithEmail = () => {
    // ... handle sign up with email logic
  };

  return (
    <div className="animated-text-container">
      <div className="background-image" />
      <h1 className="animated-text">
        Step up your game. Book a sports arena and conquer.
      </h1>
      <GetStartedButton onClick={handleGetStarted} />
      {showSignUpPopup && (
        <SignUpPopup
          onSignUpWithGoogle={handleSignUpWithGoogle}
          onSignUpWithEmail={handleSignUpWithEmail}
          onClose={handleCloseSignUpPopup}
        />
      )}
    </div>
  );
};

export default AnimatedText;
