import firebase from '../firebase';

// Example in GoogleSignUp.js
const handleGoogleSignUp = (onSignUp) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Google sign up successful:', result.user);
      console.log('onSignUp type:', typeof onSignUp);
      
      if (onSignUp && typeof onSignUp === 'function') {

        console.log('onSignUp is a function');
        onSignUp(); // Call the callback function from the main window
      } else {
        console.error('onSignUp is not a function');
      }
    })
    .catch((error) => {
      console.error('Error signing up with Google:', error);
    });
};

export default handleGoogleSignUp;
