import React from 'react';
import firebase from '../firebase'; // Import your Firebase configuration

const SignInWithGoogle = () => {
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // You can access the Google user via the result object
        const user = result.user;
        console.log('Google sign-in successful:', user);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <button onClick={handleSignInWithGoogle}>
      Sign In with Google
    </button>
  );
};

export default SignInWithGoogle;
