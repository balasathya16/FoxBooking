import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SignUpPopup from '../components/SignUpPopUp';
import sportsLogo from '../sports.png';

const Header = () => {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleGetStarted = () => {
    setShowSignUpPopup(true);
  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  return (
    <header className="header">
    <div className="logo">
      <img src={sportsLogo} alt="FoxBooking Logo" />
      <span className="logo-text">FoxBooking</span>
    </div>
    <div className="navigation">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="cta-buttons">
        <Link to="/login" className="login-button">
          Sign In
        </Link>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
    {showSignUpPopup && <SignUpPopup onClose={handleCloseSignUpPopup} />}
  </header>
  
  );
};

export default Header;
