import React from 'react';
import AnimatedText from './AnimatedText'; // Import the AnimatedText component
import GalleryTile from './GalleryTile'; // Import the GalleryTile component
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <AnimatedText /> {/* Add the AnimatedText component */}
      <GalleryTile />
    </div>
  );
};

export default HomePage;
