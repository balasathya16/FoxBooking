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
  }, []); // Empty dependency array to ensure the effect is executed only once

  if (!showFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; 2023 FoxBooking. <a href="/privacy">Privacy</a> <a href="/terms">Terms</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
