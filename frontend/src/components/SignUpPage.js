import React from 'react';
import SignUpPopUp from './SignUpPopUp';
import GoogleSignUp from './GoogleSignUp'; // Create this component for Google sign-up
import EmailSignUp from './EmailSignUp'; // Create this component for email sign-up
import PhoneSignUp from './PhoneSignUp'; // Create this component for phone sign-up
import '../styles/SignUpPage.css'; // Create a CSS file for styling the sign-up page

const SignUpPage = ({ onClose }) => {
  return (
    <div className="signup-page">
      <div className="signup-options">
        <h2>Sign up with:</h2>
        <GoogleSignUp onClose={onClose} /> {/* Google sign-up component */}
        <EmailSignUp onClose={onClose} /> {/* Email sign-up component */}
        <PhoneSignUp onClose={onClose} /> {/* Phone sign-up component */}
      </div>
    </div>
  );
};

export default SignUpPage;
