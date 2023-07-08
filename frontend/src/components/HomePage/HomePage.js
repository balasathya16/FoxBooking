import React from 'react';
import GetStartedButton from '../HomePage/GetStartedButton';
import GalleryTile from './GalleryTile';
import AnimatedText from './AnimatedText'; // Import the AnimatedText component
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

      <AnimatedText /> {/* Add the AnimatedText component */}
      
      <GetStartedButton onClick={handleSignUpButtonClick} />
      
      {/* Add your other content */}
    </div>
  );
};

export default HomePage;
