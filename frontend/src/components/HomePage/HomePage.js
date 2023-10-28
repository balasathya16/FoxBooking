import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import GalleryTile from './GalleryTile';
import Header from '../Header'; // Import the Header component

import '../../styles/HomePage.css';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('HomePage searchResults updated:', searchResults);
  }, [searchResults]);

  return (
    <div className="home-page">
      <Header updateSearchResults={setSearchResults} /> {/* Pass the updateSearchResults function to the Header */}
      <AnimatedText />
      <GalleryTile searchResults={searchResults} />
    </div>
  );
};

export default HomePage;
