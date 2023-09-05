import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import { auth } from '../firebase'; // Import your firebase instance

const PhoneSignUp = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendCode = async () => {
    try {
      const confirmation = await auth.signInWithPhoneNumber(phoneNumber);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await confirmationResult.confirm(verificationCode);
      console.log('Phone sign up successful');
      onClose(); // Close the sign-up popup or perform any other actions
    } catch (error) {
      console.error('Error verifying verification code:', error);
    }
  };

  return (
    <div className="phone-signup">
      <h3>Sign up with Phone Number</h3>
      <div className="phone-input">
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendCode}>
          <FontAwesomeIcon icon={faPhone} /> Send Code
        </button>
      </div>
      {confirmationResult && (
        <div className="verification-input">
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default PhoneSignUp;
