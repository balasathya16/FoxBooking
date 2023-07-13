import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { auth as firebaseAuth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebase from 'firebase/compat/app';

const handleSignUpWithPhone = (recaptchaVerifier, phoneNumber) => {
  const appVerifier = recaptchaVerifier;

  signInWithPhoneNumber(firebaseAuth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const verificationCode = prompt('Enter the verification code:');
      if (verificationCode) {
        confirmationResult.confirm(verificationCode)
          .then((result) => {
            console.log('Phone sign-in successful:', result.user);
          })
          .catch((error) => {
            console.error('Verification error:', error);
          });
      }
    })
    .catch((error) => {
      console.error('SMS verification error:', error);
    });
};

const PhoneSignUp = ({ recaptchaVerifier }) => {
  const phoneNumber = "+12268086028"; // Replace with the phone number you want to test

  const handleSignUpClick = () => {
    handleSignUpWithPhone(recaptchaVerifier, phoneNumber);
  };

  return (
    <button className="mb-4" onClick={handleSignUpClick}>
      <FaPhone className="icon" />
      Sign up with Phone Number
    </button>
  );
};

export default PhoneSignUp;
