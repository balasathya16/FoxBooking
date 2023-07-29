import React, { useState } from 'react';
import '../../styles/ListingTile.css';

const ListingTile = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Check if bookingTime is not empty before accessing the first element
  const firstBooking = listing.bookingTime && listing.bookingTime.length > 0 ? listing.bookingTime[0] : null;
  const bookingStatus = firstBooking ? firstBooking.status : 'No bookings available';

  return (
    <div className="listing-tile">
      {listing.images && listing.images.length > 0 ? (
        <img src={listing.images[currentImage]} alt={listing.name} className="listing-image" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <div className="listing-details">
        <h3 className="listing-name">{listing.name}</h3>
        <p className="listing-location">{listing.location}</p>
        <p className="listing-status">{bookingStatus}</p>
      </div>
    </div>
  );
};

export default ListingTile;
