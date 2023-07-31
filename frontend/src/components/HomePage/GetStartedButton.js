import React from 'react';

const GetStartedButton = ({ onClick }) => {
  return (
    <div className="get-started-container">
      <button className="get-started-button" onClick={onClick}>
        Sign up
      </button>
    </div>
  );
};

export default GetStartedButton;
