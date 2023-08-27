import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import sportsLogo from '../sports.png';

const Header = () => {

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
      </div>
    </header>
  );
};

export default Header;
