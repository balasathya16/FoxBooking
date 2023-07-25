import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPopup from './components/SignUpPopUp';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';
import AppRouter from './routes/AppRouter'; // Import the AppRouter component

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const closeSignUpPopup = () => {
    setShowSignUp(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-content">
        {/* Use the AppRouter component to manage the routing */}
        <AppRouter />
      </div>
      {showSignUp && <SignUpPopup onClose={closeSignUpPopup} />}
      <Footer />
    </div>
  );
};

export default App;
