import React from 'react';
import AnimatedText from './AnimatedText';
import GalleryTile from './GalleryTile';
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <AnimatedText />

      <div className="gallery">
        <div className="gallery-container">
          <GalleryTile name="Cricket" />
        </div>
        <div className="gallery-container">
          <GalleryTile name="Football" />
        </div>
        <div className="gallery-container">
          <GalleryTile name="Badminton" />
        </div>
      </div>

      {/* Add your other content */}
    </div>
  );
};

export default HomePage;
