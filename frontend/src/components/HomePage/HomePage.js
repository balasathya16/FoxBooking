import React from 'react';
import GalleryContainer from './GalleryContainer';

const HomePage = () => {
  console.log('Rendering HomePage'); // Add this line
  return (
    <div className="home-page">
      <h2>This is the Home Page</h2>
      <p>Some text to check if the Home Page component renders properly.</p>
      <GalleryContainer />
      <GalleryContainer />
      <GalleryContainer />
    </div>
  );
};


export default HomePage;
