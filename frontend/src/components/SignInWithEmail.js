import React, { useState } from 'react';
import firebase from '../firebase';
import '../styles/SignInWithEmail.css'; // Import the custom CSS

const SignInWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInWithEmail = () => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('Email sign-in successful:', user);

        // Retrieve additional user information (e.g., display name)
        await firebase.auth().currentUser.reload();
      })
      .catch((error) => {
        // Handle errors here
        console.error('Email sign-in error:', error);
      });
  };

  return (
    <div className="custom-signin-container">
      <input
        className="custom-input"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="custom-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="custom-button"
        onClick={handleSignInWithEmail}
      >
        Sign In with Email
      </button>
    </div>
  );
};

export default SignInWithEmail;
