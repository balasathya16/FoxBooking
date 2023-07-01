import React from 'react';

const SignUpPopup = ({ onClose }) => {
  const handleSignUpWithGoogle = () => {
    // Implement sign-up with Google logic
  };

  const handleSignUpWithFacebook = () => {
    // Implement sign-up with Facebook logic
  };

  const handleSignUpWithEmail = () => {
    // Implement sign-up with Email logic
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          Sign up with Google
        </button>
        <button className="mb-4" onClick={handleSignUpWithFacebook}>
          Sign up with Facebook
        </button>
        <button className="mb-4" onClick={handleSignUpWithEmail}>
          Sign up with Email
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
