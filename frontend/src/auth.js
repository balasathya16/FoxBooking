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
      return user.providerData.some((provider) =>
        ['password', 'google.com', 'phone'].includes(provider.providerId)
      );
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isUserSignedUp }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
