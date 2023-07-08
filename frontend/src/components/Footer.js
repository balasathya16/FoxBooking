import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollAtBottom =
        window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight;
      setShowFooter(isScrollAtBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!showFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet metus ac justo interdum aliquam.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>123 Main Street, City, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 FoxBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
