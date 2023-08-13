// ListingInfo.js
import React from 'react';

const ListingInfo = ({ listing }) => {
  return (
    <div>
      <h2>{listing.name}</h2>
      <p>{listing.description}</p>
      <p>Price per hour: ${listing.pricePerHour}</p>
      {/* Add other listing details here */}
    </div>
  );
};

export default ListingInfo;
