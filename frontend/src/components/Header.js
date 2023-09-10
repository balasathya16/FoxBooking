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
    <header className="custom-header"> {/* Use a unique class name */}
      <div className="container">
        <div className="logo-container">
          <Link to="/" className="custom-logo"> {/* Use a unique class name */}
            <img src={sportsLogo} alt="FoxBooking Logo" />
            <span className="custom-logo-text">FoxBooking</span> {/* Use a unique class name */}
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
              <Link to="/dashboard" className="custom-user-icon"> {/* Use a unique class name */}
                <FontAwesomeIcon icon={faUser} className="custom-icon" /> {/* Use a unique class name */}
              </Link>
            ) : (
              <div>
                <button className="custom-auth-button" onClick={handleSignIn}> {/* Use a unique class name */}
                  Sign In
                </button>
                <button className="custom-auth-button" onClick={handleSignUp}> {/* Use a unique class name */}
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
