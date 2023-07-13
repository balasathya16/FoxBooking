import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwYMkMDHSIJGmGl30vRDDGcqPySgFl_zU",
  authDomain: "foxbooking-f405e.firebaseapp.com",
  projectId: "foxbooking-f405e",
  storageBucket: "foxbooking-f405e.appspot.com",
  messagingSenderId: "180821396900",
  appId: "1:180821396900:web:1d0e28152e7e79e7f14531",
  measurementId: "G-V1J1G6FS83"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export { firebaseConfig };
export default firebase;
