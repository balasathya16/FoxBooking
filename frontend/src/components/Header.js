import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import AuthPopup from './AuthPopup';
import AuthContext from '../../src/auth';
import SignInWithEmail from './SignInWithEmail';
import SignInWithPhone from './SignInWithPhone';
import '../styles/Header.css';
import sportsLogo from '../sports.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import HomePage from '../components/HomePage/HomePage';

const Header = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user, isUserSignedUp, signOut } = useContext(AuthContext);
  const [googleSignInSuccess, setGoogleSignInSuccess] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      console.log('Searching with query:', searchQuery);
      const response = await axios.get(`http://127.0.0.1:8000/cricket/search?query=${searchQuery}`);
      const { data } = response;

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        console.log('Search results found:', data);
      } else {
        setSearchResults([]);
        console.log('No search results found.');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const toggleAuthModal = () => {
    setAuthModalOpen(!isAuthModalOpen);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    if ((user && isUserSignedUp()) || (user && user.providerData.length > 0)) {
      setGoogleSignInSuccess(true);
    } else {
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
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
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
    </header>
  );
};

export default Header;
