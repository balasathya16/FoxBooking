import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/BookingSummary.css';
import handleConfirmBooking from './BookingFunctions.js';

const stripePromise = loadStripe('pk_test_51NfSEEG73qJpjALVaHz7O59835GKo33MWLrLrmfbtYJVKVeQf6ZE0UZzQCepDteHikbE4rGdxiM8LmvVocJmIAdG00L1DjQ8ex');

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate
  const { selectedDate, startTime, endTime, pricePerHour, listing } = location.state;

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
  const totalCost = pricePerHour * timeDuration;
  const taxes = totalCost * 0.1; // Assuming 10% tax rate

  const [bookingData, setBookingData] = useState({
    bookingUUID: 'your_booking_uuid_here',
    cricketCourtUUID: 'your_cricket_court_uuid_here',
    amount: totalCost + taxes,
  });

  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  const handleConfirmBookingClick = async () => {
    try {
      const stripe = await stripePromise;
      await handleConfirmBooking(
        bookingData.bookingUUID,
        bookingData.cricketCourtUUID,
        bookingData.amount,
        stripe
      );

      // Redirect to the card details page after confirming the booking
      navigate('/card-details'); // Update the path to your card details page
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