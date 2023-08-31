import React, { useState } from 'react';
import GetStartedButton from './GetStartedButton';
import '../../styles/AnimatedText.css';

const AnimatedText = () => {
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  // const [showGoogleSignUp, setShowGoogleSignUp] = useState(false);

  const handleGetStarted = () => {
    setShowEmailSignUp(true);
  };



  return (
    <div className="animated-text-container">
      <div className="background-image" />
      <h1 className="animated-text">
        Step up your game. Book a sports arena and conquer.
      </h1>
      <GetStartedButton onClick={handleGetStarted} />
      
      {showEmailSignUp && (
        {/* Render your email sign-up component here when created */}
      )}

      {/* Remove the Google sign-up section */}
    </div>
  );
};

export default AnimatedText;
