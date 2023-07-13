import { auth } from '../firebase'; // Assuming `firebase.js` is located in the same directory

const handleEmailSignUp = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful sign up
      const user = userCredential.user;
      console.log('Email sign up successful:', user);
    })
    .catch((error) => {
      // Handle sign up error
      console.error('Error signing up with email:', error);
    });
};

export default handleEmailSignUp;
