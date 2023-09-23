// BookingHistory.js

import React from 'react';
import '../../styles/BookingHistory.css'

const BookingHistory = () => {
  // Fetch booking history for the user (you'll need to implement this)

  const bookingHistory = [
    {
      date: '2023-09-20',
      time: '3:00 PM - 5:00 PM',
      courtNumber: 'Court 3',
      status: 'Completed',
    },
    // Add more booking history entries as needed
  ];

  return (
    <div className="booking-history">
      <h3>Booking History</h3>
      {bookingHistory.length > 0 ? (
        <ul>
          {bookingHistory.map((booking, index) => (
            <li key={index}>
              <strong>Date:</strong> {booking.date}, <strong>Time:</strong> {booking.time}, <strong>Court:</strong> {booking.courtNumber}, <strong>Status:</strong> {booking.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  );
};

export default BookingHistory;
