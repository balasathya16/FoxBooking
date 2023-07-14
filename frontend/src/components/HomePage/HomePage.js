import React from 'react';
import AnimatedText from './AnimatedText'; // Import the AnimatedText component
import '../../styles/HomePage.css';
import GalleryTile from './GalleryTile'; // Import the GalleryTile component


const HomePage = () => {
  return (
    <div className="home-page">
      <AnimatedText /> {/* Add the AnimatedText component */}
      <GalleryTile />
    </div>
  );
};

export default HomePage;
