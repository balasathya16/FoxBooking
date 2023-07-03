import React from 'react';
import { FaGoogle, FaFacebook, FaEnvelope } from 'react-icons/fa';
import '../styles/SignUpPopUp.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase';

const SignUpPopup = ({ onClose }) => {
  const handleSignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        // Handle successful sign-up with Google
        const user = result.user;
        console.log('User signed up with Google:', user);
      })
      .catch((error) => {
        // Handle error during sign-up
        console.error('Error signing up with Google:', error);
      });
  };

  const handleSignUpWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
  
    // Check if there is an existing popup and close it before opening a new one
    if (auth.currentUser && auth.currentUser.multiFactor && auth.currentUser.multiFactor.hint) {
      auth.currentUser.multiFactor.hint.close();
    }
  
    auth.signInWithPopup(provider)
      .then((result) => {
        // Handle successful sign-up with Facebook
        const user = result.user;
        console.log('User signed up with Facebook:', user);
      })
      .catch((error) => {
        // Handle error during sign-up
        if (error.code === 'auth/cancelled-popup-request') {
          console.log('Popup request cancelled due to conflict');
        } else {
          console.error('Error signing up with Facebook:', error);
        }
      });
  };
  

  const handleSignUpWithEmail = () => {
    // Implement your own logic for sign-up with email
    const email = 'example@example.com';
    const password = 'password';

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Handle successful sign-up with email
        const user = userCredential.user;
        console.log('User signed up with email:', user);
      })
      .catch((error) => {
        // Handle error during sign-up
        console.error('Error signing up with email:', error);
      });
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="mb-4" onClick={handleSignUpWithGoogle}>
          <FaGoogle className="icon" />
          Sign up with Google
        </button>
        <button className="mb-4" onClick={handleSignUpWithFacebook}>
          <FaFacebook className="icon" />
          Sign up with Facebook
        </button>
        <button className="mb-4" onClick={handleSignUpWithEmail}>
          <FaEnvelope className="icon" />
          Sign up with Email
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;
