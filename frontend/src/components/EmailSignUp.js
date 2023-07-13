import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const EmailSignUp = ({ onSignUpWithEmail }) => {
  return (
    <button className="mb-4" onClick={onSignUpWithEmail}>
      <FaEnvelope className="icon" />
      Sign up with Email
    </button>
  );
};

export default EmailSignUp;
