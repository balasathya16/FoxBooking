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
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/cricket">Cricket</Link>
          </li>
          <li>
            <Link to="/football">Football</Link>
          </li>
          <li>
            <Link to="/badminton">Badminton</Link>
          </li>
        </ul>
      </nav>
      <div className="cta-buttons">
        <Link to="/login" className="login-button">
          Sign In
        </Link>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      {showSignUpPopup && <SignUpPopup onClose={handleCloseSignUpPopup} />}
    </header>
  );
};

export default Header;
