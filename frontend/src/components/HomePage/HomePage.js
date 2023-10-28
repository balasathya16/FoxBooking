import React, { useState, useEffect } from 'react';
import Header from '../Header'

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
      {/* Pass a function to update searchResults to the Header component */}
      <Header updateSearchResults={setSearchResults} />
    </div>
  );
};

export default HomePage;
