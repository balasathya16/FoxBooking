import { FaGoogle, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../styles/SignUpPopUp.css';
import { auth as firebaseAuth } from '../firebase'; // Import the Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; // Import RecaptchaVerifier and signInWithPhoneNumber
import firebase from 'firebase/compat/app'; // Import the Firebase app module

const handleSignUpWithGoogle = () => {
  const provider = new firebaseAuth.GoogleAuthProvider();
  firebaseAuth
    .signInWithPopup(provider)
    .then((result) => {
      // Handle successful sign-in
      console.log('Sign-in successful:', result.user);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error('Sign-in error:', error);
    });
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// sign up with phone

const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'invisible',
  callback: (response) => {
    handleSignUpWithPhone(response);
  }
}, firebaseAuth);

recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

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

const SignUpPopup = ({ onSignUpWithEmail, onClose }) => {
  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          <FaGoogle className="icon" />
          Sign up with Google
        </button>
        <button className="mb-4" onClick={onSignUpWithEmail}>
          <FaEnvelope className="icon" />
          Sign up with Email
        </button>
        <button className="mb-4" onClick={handleSignUpWithPhone}>
          <FaPhone className="icon" />
          Sign up with Phone Number
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
