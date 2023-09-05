import React, { useState } from 'react';
import GetStartedButton from './GetStartedButton';
import SignUpPage from '../SignUpPage'; // Make sure the path is correct
import '../../styles/AnimatedText.css';

const AnimatedText = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleGetStarted = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <div className="animated-text-container">
      <div className="background-image" />
      <h1 className="animated-text">
        Step up your game. Book a sports arena and conquer.
      </h1>
      <GetStartedButton onClick={handleGetStarted} />
      
      {showSignUp && (
        <SignUpPage onClose={handleCloseSignUp} />
      )}

      {/* Remove the Google sign-up section */}
    </div>
  );
};

export default AnimatedText;
