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
  const [setSignedUp] = useState(false);

  const openSignUpPopup = () => {
    setShowSignUp(true);
  };

  const closeSignUpPopup = () => {
    setShowSignUp(false);
  };

  const handleSuccessfulSignUp = () => {
    console.log('Successful sign-up callback called');
    setSignedUp(true);
    closeSignUpPopup();
  };

  return (
    <div className="App">
      <Header openSignUp={openSignUpPopup} />
      <div className="App-content">
        {showSignUp && (
          <SignUpPopup onClose={closeSignUpPopup} onSignUp={handleSuccessfulSignUp} />
        )}
        <AppRouter /> {/* Render the AppRouter component */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
