import React, { useState, useEffect } from 'react';
import firebase from './firebase';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const isUserSignedUp = () => {
    if (user) {
      return user.providerData.some(
        (provider) => provider.providerId === 'google.com'
      );
    }
    return false;
  };

  const signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('User signed out successfully.');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, isUserSignedUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
