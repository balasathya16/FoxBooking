import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BookingSummary.css';

const BookingSummary = () => {
  const location = useLocation();
  const { selectedDate, startTime, endTime, pricePerHour, listing } = location.state;

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
  const totalCost = pricePerHour * timeDuration;
  const taxes = totalCost * 0.1; // Assuming 10% tax rate

  // Custom options for formatting time without seconds
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  return (
    <div className="booking-summary-container">
      <h1>Booking Summary</h1>
      <div className="booking-summary-listing-info">
        {listing.images && listing.images.length > 0 ? (
          <img src={listing.images[0]} alt={listing.name} className="booking-summary-listing-image" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        <div className="booking-summary-listing-details">
          <h2>{listing.name}</h2>
        </div>
      </div>
      <div className="booking-summary-summary-item">
        <p>Date:</p>
        <p>{selectedDate.toDateString()}</p>
      </div>
      <div className="booking-summary-summary-item">
        <p>Time:</p>
        <p>{`${startTimeObj.toLocaleTimeString([], timeOptions)} - ${endTimeObj.toLocaleTimeString([], timeOptions)}`}</p>
      </div>
      <div className="booking-summary-summary-item">
        <p>Total Hours:</p>
        <p>{timeDuration.toFixed(2)}</p>
      </div>
      <div className="booking-summary-summary-item">
        <p>Taxes:</p>
        <p>${taxes.toFixed(2)}</p>
      </div>
      <div className="booking-summary-summary-item">
        <p>Total:</p>
        <p>${totalCost.toFixed(2)}</p>
      </div>
      <button className="booking-summary-confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookingSummary;
