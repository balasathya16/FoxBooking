import React, { useContext } from 'react';
import AuthContext from '../auth'; // Import the AuthContext
import '../styles/Dashboard.css'; // Create this CSS file

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Destructure user from AuthContext

  return (
    <div className="dashboard">
      <h2>Welcome, {user ? user.displayName || 'User' : 'User'}!</h2>
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard;
