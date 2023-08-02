// ListingTile.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ListingTile.css';

const ListingTile = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = (e) => {
    e.preventDefault(); // Prevent the default behavior (e.g., redirection)
    setCurrentImage((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1));
  };

  const nextImage = (e) => {
    e.preventDefault(); // Prevent the default behavior (e.g., redirection)
    setCurrentImage((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Link to={`/listing/${listing.id}`} target="_blank">
      <div className="listing-tile">
        <div className="image-container">
          {listing.images && listing.images.length > 0 ? (
            <>
              <div className="left-arrow arrow-circle" onClick={prevImage}>
                &lt;
              </div>
              <img src={listing.images[currentImage]} alt={listing.name} className="listing-image" />
              <div className="right-arrow arrow-circle" onClick={nextImage}>
                &gt;
              </div>
            </>
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>
        <div className="listing-details">
          <h3 className="listing-name">{listing.name}</h3>
          <p className="listing-location">{listing.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ListingTile;
