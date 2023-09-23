// ProfileSummary.js

import React, { useContext } from 'react';
import AuthContext from '../../auth';  // Update the path for AuthContext

const ProfileSummary = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-summary">
      <h3>Profile Summary</h3>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more profile information as needed */}
          <button>Edit Profile</button>
        </div>
      ) : (
        <p>No user profile available.</p>
      )}
    </div>
  );
};

export default ProfileSummary;
