import React from 'react';

const GetStartedButton = ({ showSignUp, onClick }) => {
  return (
    <div className="get-started-container">
      <button className="get-started-button" onClick={showSignUp ? onClick : () => onClick('/signup')}>
        {showSignUp ? 'Sign up' : 'Get Started'}
      </button>
    </div>
  );
};

export default GetStartedButton;
