import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ListingTile.css';

const ListingTile = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTileClick = (e) => {
    e.stopPropagation();
    // Handle tile click here, such as navigating to the ListingDetailsPage
    // You can use react-router-dom's useHistory or Link component for this
  };

  return (
    <div className="listing-tile" onClick={handleTileClick}>
      <div className="image-container">
        {listing.images && listing.images.length > 0 ? (
          <>
            <div className="arrow-btn-container">
              <button className="arrow-btn left-arrow" onClick={prevImage}>
                &lt;
              </button>
              <button className="arrow-btn right-arrow" onClick={nextImage}>
                &gt;
              </button>
            </div>
            <img src={listing.images[currentImage]} alt={listing.name} className="listing-image" />
          </>
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="listing-details">
        <h3 className="listing-name">{listing.name}</h3>
        <p className="listing-location">{listing.location}</p>
        {/* The Link component wraps the details */}
        <Link to={`/listing/${listing.id}`} className="details-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingTile;
