// BookingSummary.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BookingSummary.css';

const BookingSummary = () => {
  const location = useLocation();
  const { selectedDate, startTime, endTime, pricePerHour } = location.state;

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
  const totalCost = pricePerHour * timeDuration;
  const taxes = totalCost * 0.1; // Assuming 10% tax rate

  return (
    <div className="custom-booking-summary">
      <h1>Booking Summary</h1>
      <div className="summary-item">
        <p>Date:</p>
        <p>{selectedDate.toDateString()}</p>
      </div>
      <div className="summary-item">
        <p>Time:</p>
        <p>{`${startTimeObj.toLocaleTimeString()} - ${endTimeObj.toLocaleTimeString()}`}</p>
      </div>
      <div className="summary-item">
        <p>Total Hours:</p>
        <p>{timeDuration.toFixed(2)}</p>
      </div>
      <div className="summary-item">
        <p>Taxes:</p>
        <p>${taxes.toFixed(2)}</p>
      </div>
      <div className="summary-item">
        <p>Total:</p>
        <p>${totalCost.toFixed(2)}</p>
      </div>
      <button className="custom-confirm-button">Confirm Booking</button>
    </div>
  );
};

export default BookingSummary;
