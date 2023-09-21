import React, { useState } from 'react';
import firebase from '../firebase';

const SignInWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInWithEmail = () => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('Email sign-in successful:', user);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Email sign-in error:', error);
      });
  };

  return (
    <div>
      {/* UI and functionality for signing in with email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignInWithEmail}>Sign In with Email</button>
    </div>
  );
};

export default SignInWithEmail;
