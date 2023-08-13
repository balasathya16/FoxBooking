import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AvailabilityCalendar from './AvailabilityCalendar';
import ListingInfo from './ListingInfo'; // Import the new component
import '../styles/ListingDetailsPage.css';
import '../styles/AvailabilityCalendar.css';

const ListingDetailsPage  = () => {
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
    setShowFullscreen(!showFullscreen);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found.</div>;
  }

  return (
    <div className="custom-listing-details-container">
      <div className="custom-listing-images-container">
        <div className={`custom-slideshow-container ${showFullscreen ? 'custom-fullscreen' : ''}`}>
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.name}
            className="custom-slideshow-image-content"
            onClick={handleImageClick}
          />
          <div className="custom-listing-image-navigation">
            <button onClick={handlePrevImage}>◀</button>
            <button onClick={handleNextImage}>▶</button>
          </div>
        </div>
      </div>
      <ListingInfo listing={listing} /> {/* Use the new component */}
      {/* Add other listing details here */}
      {/* Add a "Book Now" button */}
      {showFullscreen && (
        <div className="custom-fullscreen-image-overlay" onClick={handleCloseFullscreen}>
          <img src={listing.images[currentImageIndex]} alt={listing.name} className="custom-fullscreen-image-content" />
          <span className="custom-close-button" onClick={handleCloseFullscreen}>
            &times;
          </span>
        </div>
      )}
      <AvailabilityCalendar pricePerHour={listing.pricePerHour} />
    </div>
  );
};

export default ListingDetailsPage;
