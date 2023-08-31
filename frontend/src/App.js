import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPopup from './components/SignUpPopUp';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';
import AppRouter from './routes/AppRouter'; // Import AppRouter

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isUserSignedUp, setIsUserSignedUp] = useState(false); // Track user sign-up

  const openSignUpPopup = () => {
    console.log('Opening sign-up popup');
    setShowSignUp(true);
  };

  const closeSignUpPopup = () => {
    console.log('Closing sign-up popup');
    setShowSignUp(false);
  };

  const handleSuccessfulSignUp = () => {
    console.log('Successful sign-up callback called');
    setIsUserSignedUp(true); // Set the user as signed up
    closeSignUpPopup();
  };

  console.log('App render');

  return (
    <div className="App">
       <Header openSignUp={openSignUpPopup} />
       <div className="App-content">
          {showSignUp && (
             <SignUpPopup onClose={closeSignUpPopup} onSignUp={handleSuccessfulSignUp} />
          )}
          <AppRouter />
       </div>
       <Footer />
    </div>
 );
};

export default App;
