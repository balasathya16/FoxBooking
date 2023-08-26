import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import sportsLogo from '../sports.png';
import AuthContext from '../auth'; // Import the AuthContext
import GetStartedButton from '../components/HomePage/GetStartedButton'; // Import the GetStartedButton component

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
        </div>
        <div className="cta-buttons">
          {user ? (
            <Link to="/dashboard" className="user-icon">
              {/* Display user icon or username */}
              <i className="fas fa-user"></i>
            </Link>
          ) : (
            <GetStartedButton onClick={() => console.log("Open sign up popup")} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
