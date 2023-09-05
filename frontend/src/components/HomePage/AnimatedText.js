import React, { useState } from 'react';
import GetStartedButton from './GetStartedButton';
import '../../styles/AnimatedText.css';

const AnimatedText = () => {
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

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
        // Place your JSX content to render when showEmailSignUp is true here
        <div>
          This is the content to render when showEmailSignUp is true.
        </div>
      )}

      {/* Remove the Google sign-up section */}
    </div>
  );
}

export default AnimatedText;
