import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { auth as firebaseAuth } from '../firebase';

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

const GoogleSignUp = () => {
  return (
    <button className="mb-4" onClick={handleSignUpWithGoogle}>
      <FaGoogle className="icon" />
      Sign up with Google
    </button>
  );
};

export default GoogleSignUp;
