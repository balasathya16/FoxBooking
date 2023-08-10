import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingSummary = () => {
  const location = useLocation();
  const { selectedDate, startTime, endTime, pricePerHour } = location.state;

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
  const totalCost = pricePerHour * timeDuration;

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      <p>Selected Date: {selectedDate.toString()}</p>
      <p>Start Time: {startTimeObj.toString()}</p>
      <p>End Time: {endTimeObj.toString()}</p>
      <p>Total Hours: {timeDuration.toFixed(2)}</p>
      <p>Total Cost: ${totalCost.toFixed(2)}</p>
      {/* Add a "Confirm Booking" button */}
      <button>Confirm Booking</button>
    </div>
  );
};

export default BookingSummary;
