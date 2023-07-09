import React from 'react';
import AnimatedText from './AnimatedText'; // Import the AnimatedText component
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <AnimatedText /> {/* Add the AnimatedText component */}
    </div>
  );
};

export default HomePage;
