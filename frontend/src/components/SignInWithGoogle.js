import React from 'react';
import firebase from '../firebase';
import '../styles/SignInWithGoogle.css';

const SignInWithGoogle = () => {
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log('Google sign-in successful:', user);
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <button onClick={handleSignInWithGoogle} className="signIn-google-button">
    Sign In with Google
  </button>
  
  );
};

export default SignInWithGoogle;
