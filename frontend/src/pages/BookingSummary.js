import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/BookingSummary.css';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, startTime, endTime, pricePerHour, listing } = location.state;

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
  const totalCost = pricePerHour * timeDuration;
  const taxes = totalCost * 0.1; // Assuming 10% tax rate

  console.log('Price per hour:', pricePerHour);
  console.log('Time duration (hours):', timeDuration);
  console.log('Total cost (dollars):', totalCost);

  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  const handleConfirmBookingClick = async () => {
    try {
      // Redirect to the card details page after confirming the booking
      navigate('/card-details', { state: { totalCost } }); // Update the path and pass totalCost to card-details
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

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
      <button className="booking-summary-confirm-button" onClick={handleConfirmBookingClick}>
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSummary;
