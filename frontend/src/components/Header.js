import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import AuthPopup from './AuthPopup';
import AuthContext from '../../src/auth';
import SignInWithEmail from './SignInWithEmail'; // Import SignUpWithEmail
import SignInWithPhone from './SignInWithPhone'; // Import SignInWithPhone
import '../styles/Header.css';
import sportsLogo from '../sports.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  console.log('Rendering Header component');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { user, isUserSignedUp, signOut } = useContext(AuthContext);
  const [googleSignInSuccess, setGoogleSignInSuccess] = useState(false);

  const toggleAuthModal = () => {
    console.log('Toggling auth modal');
    setAuthModalOpen(!isAuthModalOpen);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    console.log('user:', user);
    console.log('isUserSignedUp():', isUserSignedUp());

    if ((user && isUserSignedUp()) || (user && user.providerData.length > 0)) {
      console.log('Successful sign-in');
      setGoogleSignInSuccess(true);
    } else {
      console.log('Sign-in failure');
      setGoogleSignInSuccess(false);
    }
  }, [user, isUserSignedUp]);

  const handleSignIn = () => {
    console.log('Sign In clicked');
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    togglePopup();
  };

  const handleSignOut = () => {
    if (isPopupOpen) {
      togglePopup();
    }
    signOut();
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
            {!googleSignInSuccess && !user && (
              <>
                <button className="custom-auth-button" onClick={handleSignUp}>
                  Sign Up
                </button>
                {isPopupOpen && <AuthPopup onClose={togglePopup} />}
              </>
            )}
            {(googleSignInSuccess || (user && isUserSignedUp())) && (
              <div className="show-user-icon">
                <Link to="/dashboard" className="custom-user-icon">
                  <FontAwesomeIcon icon={faUser} className="custom-icon" />
                </Link>
              </div>
            )}
            {user && (
              <button className="custom-auth-button" onClick={handleSignOut}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </header>
  );
};

export default Header;
