import React, { useContext } from 'react';
import AuthContext from '../../auth';  // Update the path for AuthContext
import UpcomingBookings from './UpcomingBookings';     // Update the path for UpcomingBookings
import BookingHistory from './BookingHistory';         // Update the path for BookingHistory
import ProfileSummary from './ProfileSummary';         // Update the path for ProfileSummary
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h2>Welcome, {user ? (user.displayName || 'User') : 'User'}!</h2>

      {/* Display UpcomingBookings component */}
      <UpcomingBookings />

      {/* Display BookingHistory component */}
      <BookingHistory />

      {/* Display ProfileSummary component */}
      <ProfileSummary />
    </div>
  );
};

export default Dashboard;
