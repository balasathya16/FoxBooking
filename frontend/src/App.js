import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import GetStartedButton from './components/HomePage/GetStartedButton'; // Import GetStartedButton
import SignUpPopup from './components/SignUpPopUp';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const closeSignUpPopup = () => {
    setShowSignUp(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <HomePage />
        <GetStartedButton onClick={handleSignUpClick} />
        {showSignUp && <SignUpPopup onClose={closeSignUpPopup} />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
