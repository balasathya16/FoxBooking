// ListingInfo.js
import React from 'react';
import '../styles/ListingInfo.css'; // Import the CSS file

const ListingInfo = ({ listing }) => {
  return (
    <div className="listing-info-container">
      <h2 className="listing-info-title">{listing.name}</h2>
      <p className="listing-info-description">{listing.description}</p>
      <p className="listing-info-price">Price per hour: ${listing.pricePerHour}</p>
      {/* Add other listing details here */}
    </div>
  );
};

export default ListingInfo;
