import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../auth';
import AuthModal from './AuthModal';
import SignInWithGoogle from './SignInWithGoogle';
import '../styles/Header.css';
import sportsLogo from '../sports.png';

const Header = () => {
  const { user, isUserSignedUp } = useContext(AuthContext);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

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
            {!user && !isUserSignedUp() && (
              <div>
                <button className="custom-auth-button" onClick={handleSignIn}>
                  Sign In
                </button>
                <button className="custom-auth-button" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            )}
            {user && isUserSignedUp() && (
              <div className="show-user-icon">
                <Link to="/dashboard" className="custom-user-icon">
                  <FontAwesomeIcon icon={faUser} className="custom-icon" />
                </Link>
              </div>
            )}
            {!user && <SignInWithGoogle />}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </header>
  );
};

export default Header;
