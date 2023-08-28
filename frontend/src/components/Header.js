import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import sportsLogo from '../sports.png';
import AuthContext from '../auth'; // Import the AuthContext

const Header = () => {
  const user = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={sportsLogo} alt="FoxBooking Logo" />
        <span className="logo-text">FoxBooking</span>
      </Link>
      <div className="navigation">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
          {user ? (
            <Link to="/dashboard" className="user-icon">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
