import React, { useState } from 'react';
import '../../styles/ListingTile.css';

const ListingTile = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = () => {
    if (listing.images && listing.images.length > 0) {
      setCurrentImage((prevImage) => (prevImage - 1 + listing.images.length) % listing.images.length);
    }
  };

  const handleNextImage = () => {
    if (listing.images && listing.images.length > 0) {
      setCurrentImage((prevImage) => (prevImage + 1) % listing.images.length);
    }
  };

  return (
    <div className="listing-tile">
      {listing.images && listing.images.length > 0 ? (
        <img src={listing.images[currentImage]} alt={listing.name} className="listing-image" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <div className="listing-details">
        <h3 className="listing-name">{listing.name}</h3>
        <p className="listing-price">{listing.price}</p>
        <div className="listing-rating">
          Rating: {listing.rating}
        </div>
        <div className="listing-availability">
          Availability: {listing.availability ? 'Available' : 'Not Available'}
        </div>
        <div className="listing-image-navigation">
          <button onClick={handlePrevImage}>Previous</button>
          <button onClick={handleNextImage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ListingTile;
