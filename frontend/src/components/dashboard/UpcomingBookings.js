// UpcomingBookings.js

import React from 'react';
import '../../styles/UpcomingBookings.css'

const UpcomingBookings = () => {
  // Fetch upcoming bookings for the user (you'll need to implement this)

  const upcomingBookings = [
    {
      date: '2023-09-25',
      time: '10:00 AM - 12:00 PM',
      courtNumber: 'Court 1',
    },
    // Add more upcoming bookings as needed
  ];

  return (
    <div className="upcoming-bookings">
      <h3>Upcoming Bookings</h3>
      {upcomingBookings.length > 0 ? (
        <ul>
          {upcomingBookings.map((booking, index) => (
            <li key={index}>
              <strong>Date:</strong> {booking.date}, <strong>Time:</strong> {booking.time}, <strong>Court:</strong> {booking.courtNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </div>
  );
};

export default UpcomingBookings;
