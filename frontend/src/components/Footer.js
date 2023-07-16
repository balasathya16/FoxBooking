import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollAtBottom =
        window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight;
      setShowFooter(isScrollAtBottom);
    };

    // Add debouncing to the scroll event listener
    let timeoutId;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100); // Adjust the delay (in milliseconds) as needed
    };

    window.addEventListener('scroll', debouncedScroll);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, []); // Empty dependency array to ensure the effect is executed only once

  return (
    <footer className={`footer ${showFooter ? 'visible' : ''}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; 2023 FoxBooking <a href="/privacy">Privacy</a> <a href="/terms">Terms</a></p>
          </div>
          <div className="footer-right">
            <div className="social-icons">
              <a href="https://www.youtube.com/your-youtube-page" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="social-icon" />
              </a>
              <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/your-linkedin-page" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
