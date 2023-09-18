import React from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SignInWithGoogle from './SignInWithGoogle';
import '../styles/Header.css';
import sportsLogo from '../sports.png';

const Header = () => {
  const [isAuthModalOpen, setAuthModalOpen] = React.useState(false);

  const toggleAuthModal = () => {
    setAuthModalOpen(!isAuthModalOpen);
  };

  const handleSignIn = () => {
    console.log('Sign In clicked');
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
  };

  return (
    <header className="custom-header">
      <div className="container">
        <div className="logo-container">
          <Link to="/" className="custom-logo">
            <img src={sportsLogo} alt="FoxBooking Logo" />
            <span className="custom-logo-text">FoxBooking</span>
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
            <button className="custom-auth-button" onClick={handleSignUp}>
              Sign Up
            </button>
            <button className="custom-auth-button" onClick={handleSignIn}>
              Sign In
            </button>
            <SignInWithGoogle />
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </header>
  );
};

export default Header;
