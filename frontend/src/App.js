  import React, { useState } from 'react';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import SignUpPopup from './components/SignUpPopUp';
  import './styles/Header.css';
  import './styles/Footer.css';
  import './styles/tailwind.css';
  import AppRouter from './routes/AppRouter';

  const App = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

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
        {/* Pass openSignUpPopup as a prop to Header */}
        <Header openSignUp={openSignUpPopup} />
        <div className="App-content">
          {/* Pass onSignUpSuccess callback to SignUpPopup */}
          <AppRouter />
        </div>
        {/* Show the sign-up popup only if not signed up */}
        {!signedUp && showSignUp && (
          <SignUpPopup onClose={closeSignUpPopup} onSignUp={handleSuccessfulSignUp} />
        )}
        <Footer />
      </div>
    );
  };

  export default App;
