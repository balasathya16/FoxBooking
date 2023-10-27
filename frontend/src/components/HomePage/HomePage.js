import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import GalleryTile from './GalleryTile';
import '../../styles/HomePage.css';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('HomePage searchResults updated:', searchResults);
  }, [searchResults]);

  return (
    <div className="home-page">
      <AnimatedText />
      <GalleryTile searchResults={searchResults} />
    </div>
  );
};

export default HomePage;
