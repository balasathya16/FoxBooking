import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPage from './components/SignUpPage'; // Import SignUpPage directly
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';
import AppRouter from './routes/AppRouter';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const openSignUpPopup = () => {
    console.log('Opening sign-up popup');
    setShowSignUp(true);
  };

  const closeSignUpPopup = () => {
    console.log('Closing sign-up popup');
    setShowSignUp(false);
  };

  console.log('App render');

  return (
    <div className="App">
       <Header openSignUp={openSignUpPopup} />
       <div className="App-content">
          {showSignUp && (
             <SignUpPage onClose={closeSignUpPopup} />
          )}
          <AppRouter />
       </div>
       <Footer />
    </div>
 );
};

export default App;
