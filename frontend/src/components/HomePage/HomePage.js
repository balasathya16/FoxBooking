import React from 'react';
import GalleryTile from './GalleryTile';
import AnimatedText from './AnimatedText'; // Import the AnimatedText component
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <AnimatedText /> {/* Add the AnimatedText component */}
      {/* Your existing code */}
      <GalleryTile name="Cricket" />
      <GalleryTile name="Football" />
      <GalleryTile name="Badminton" />
    </div>
  );
};

export default HomePage;
