import React, { useState } from 'react';
import firebase from '../firebase';
import '../styles/SignInWithEmail.css'; // Import your custom styles

const SignInWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignInWithEmail();
    }
  };

  const handleSignInWithEmail = () => {
    firebase
      .auth()
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
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress} // Handle 'Enter' key
        className="custom-input"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress} // Handle 'Enter' key
        className="custom-input"
      />
      <button onClick={handleSignInWithEmail} className="custom-button">
        Sign In with Email
      </button>
    </div>
  );
};

export default SignInWithEmail;
