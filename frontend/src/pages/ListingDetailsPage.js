import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ListingDetailsPage.css';
import AvailabilityCalendar from './AvailabilityCalendar'; // Import the AvailabilityCalendar component

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cricket/${id}`);
        const { data } = response;
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  const handlePrevImage = () => {
    if (!showFullscreen) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.images.length) % listing.images.length);
    }
  };

  const handleNextImage = () => {
    if (!showFullscreen) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
    }
  };

  const handleImageClick = () => {
    setShowFullscreen(!showFullscreen); // Toggle fullscreen view on image click
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false); // Close fullscreen view
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found.</div>;
  }

  return (
    <div className="listing-details-page">
      {/* Display the current image */}
      <div className="listing-images">
        <div className={`slideshow-container ${showFullscreen ? 'fullscreen' : ''}`}>
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.name}
            className="slideshow-image"
            onClick={handleImageClick}
          />
          {/* Display the left and right arrows */}
          <div className="listing-image-navigation">
            <button onClick={handlePrevImage}>◀</button>
            <button onClick={handleNextImage}>▶</button>
          </div>
        </div>
      </div>
      {/* Display listing name and description */}
      <h2>{listing.name}</h2>
      <p>{listing.description}</p>
      {/* Add other listing details here */}
      {/* Add a "Book Now" button */}
      <button>Book Now</button>
      {/* Fullscreen image overlay */}
      {showFullscreen && (
        <div className="fullscreen-image-overlay" onClick={handleCloseFullscreen}>
          <img src={listing.images[currentImageIndex]} alt={listing.name} className="fullscreen-image" />
          <span className="close-button" onClick={handleCloseFullscreen}>
            &times;
          </span>
        </div>
      )}
      {/* Display the Availability Calendar component below the content */}
      <AvailabilityCalendar />
    </div>
  );
};

export default ListingDetailsPage;
