import React from 'react';

const BookingSummary = ({ selectedDate, startTime, endTime, pricePerHour }) => {
    console.log('startTime:', startTime);
    console.log('endTime:', endTime);

    const startTimeObj = new Date(startTime);
    const endTimeObj = new Date(endTime);

    console.log('startTimeObj:', startTimeObj);
    console.log('endTimeObj:', endTimeObj);

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
