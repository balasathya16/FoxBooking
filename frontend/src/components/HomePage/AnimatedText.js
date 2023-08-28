import React, { useState } from 'react';
import GetStartedButton from './GetStartedButton';
import SignUpPopup from '../SignUpPopUp';
import '../../styles/AnimatedText.css';

const AnimatedText = () => {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleGetStarted = () => {
    setShowSignUpPopup(true);
  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  return (
    <div className="animated-text-container">
      <div className="background-image" />
      <h1 className="animated-text">
        Step up your game. Book a sports arena and conquer.
      </h1>
      <GetStartedButton onClick={handleGetStarted} />
      {showSignUpPopup && (
        <SignUpPopup onClose={handleCloseSignUpPopup} isButtonVisible={true} />
      )}
    </div>
  );
};

export default AnimatedText;
