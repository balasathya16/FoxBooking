import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src= "../../stretching-exercises.png" alt="FoxBooking Logo" />
        <span className="logo-text">FoxBooking</span>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/indoor-cricket">Cricket</Link>
          </li>
          <li>
            <Link to="/indoor-football">Football</Link>
          </li>
          <li>
            <Link to="/indoor-badminton">Badminton</Link>
          </li>
        </ul>
      </nav>
      <div className="cta-buttons">
        <Link to="/login" className="login-button">
          Sign In
        </Link>
        <Link to="/signup" className="get-started-button">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;
