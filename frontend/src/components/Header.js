import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../auth';
import AuthModal from './AuthModal';
import '../styles/Header.css'; // Import your Header.css stylesheet
import sportsLogo from '../sports.png';

const Header = () => {
  const user = useContext(AuthContext);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const toggleAuthModal = () => {
    setAuthModalOpen(!isAuthModalOpen);
  };

  const handleSignIn = () => {
    // Add logic for handling sign-in action
    console.log('Sign In clicked');
  };

  const handleSignUp = () => {
    // Add logic for handling sign-up action
    console.log('Sign Up clicked');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={sportsLogo} alt="FoxBooking Logo" />
            <span className="logo-text">FoxBooking</span>
          </Link>
        </div>
        <div className="navigation">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="cta-buttons">
            {user ? (
              <Link to="/dashboard" className="user-icon">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </Link>
            ) : (
              <div>
                <button className="auth-button" onClick={handleSignIn}>
                  Sign In
                </button>
                <button className="auth-button" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </header>
  );
};

export default Header;
