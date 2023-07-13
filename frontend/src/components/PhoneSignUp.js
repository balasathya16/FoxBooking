import React, { useEffect, useRef } from 'react';
import GoogleSignUp from './GoogleSignUp';
import EmailSignUp from './EmailSignUp';
import '../styles/SignUpPopUp.css';
import { auth as firebaseAuth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { firebaseConfig, app } from '../firebase';

const SignUpPopup = ({ onSignUpWithEmail, onClose }) => {
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    // Initialize Firebase
    recaptchaVerifier.current = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // handleSignUpWithPhone(response); // Commented out for now
      }
    }, app.auth());

    recaptchaVerifier.current.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });

    return () => {
      app.delete(); // Clean up Firebase app instance when component unmounts
    };
  }, []);

  // const handleSignUpWithPhone = (recaptchaToken) => {
  //   const phoneNumber = "+12268086028"; // Replace with the phone number you want to test
  //   const appVerifier = window.recaptchaWidgetId;

  //   signInWithPhoneNumber(firebaseAuth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       const verificationCode = prompt('Enter the verification code:');
  //       if (verificationCode) {
  //         confirmationResult.confirm(verificationCode)
  //           .then((result) => {
  //             console.log('Phone sign-in successful:', result.user);
  //           })
  //           .catch((error) => {
  //             console.error('Verification error:', error);
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('SMS verification error:', error);
  //     });
  // };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <GoogleSignUp />
        <EmailSignUp onSignUpWithEmail={onSignUpWithEmail} />
        {/* <PhoneSignUp recaptchaVerifier={recaptchaVerifier} /> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
