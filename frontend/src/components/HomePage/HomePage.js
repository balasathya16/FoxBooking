import React from 'react';
import GetStartedButton from '../HomePage/GetStartedButton';

import GalleryTile from './GalleryTile';
import '../../styles/HomePage.css';

const HomePage = () => {
  const handleSignUpButtonClick = () => {
    // Handle sign up button click logic here
  };

  return (
    <div className="home-page">
      {/* Your existing code */}
      <GalleryTile name="Cricket" />
      <GalleryTile name="Football" />
      <GalleryTile name="Badminton" />
      
      <GetStartedButton onClick={handleSignUpButtonClick} />
      
      {/* Add your other content */}
    </div>
  );
};

export default HomePage;