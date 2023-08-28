import React, { useState } from 'react';
import GetStartedButton from './GetStartedButton';
import SignUpPopup from '../SignUpPopUp';
import '../../styles/AnimatedText.css';

const AnimatedText = () => {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false); // Add this state

  const handleGetStarted = () => {
    setShowSignUpPopup(true);
  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setShowSignUpPopup(false); // Close the popup after successful sign-up
  };

  return (
    <div className="animated-text-container">
      <div className="background-image" />
      <h1 className="animated-text">
        Step up your game. Book a sports arena and conquer.
      </h1>
      <GetStartedButton onClick={handleGetStarted} />
      {showSignUpPopup && (
        <SignUpPopup onClose={handleCloseSignUpPopup} isButtonVisible={!isSignedUp} />
      )}
    </div>
  );
};

export default AnimatedText;
