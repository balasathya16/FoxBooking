import React from 'react';
import GoogleSignUp from './GoogleSignUp';
import EmailSignUp from './EmailSignUp';
import PhoneSignUp from './PhoneSignUp';
import '../styles/SignUpPopUp.css';
import { auth as firebaseAuth } from '../firebase'; // Import the Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; // Import RecaptchaVerifier and signInWithPhoneNumber
import firebase from 'firebase/compat/app'; // Import the Firebase app module
import { firebaseConfig } from '../firebase'; // Import the firebaseConfig object

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const SignUpPopup = ({ onSignUpWithEmail, onClose }) => {
  const handleSignUpWithPhone = (recaptchaToken) => {
    const phoneNumber = "+12268086028"; // Replace with the phone number you want to test
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

  const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: (response) => {
      handleSignUpWithPhone(response);
    }
  }, firebaseAuth);

  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <GoogleSignUp />
        <EmailSignUp onSignUpWithEmail={onSignUpWithEmail} />
        <PhoneSignUp onSignUpWithPhone={handleSignUpWithPhone} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
