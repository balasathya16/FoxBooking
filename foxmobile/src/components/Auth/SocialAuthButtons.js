import React from 'react';
import { Link } from 'react-router-dom';

const SocialAuthButtons = () => {
  return (
    <div>
      <Link to="/auth/google">Sign up with Google</Link>
      <Link to="/auth/facebook">Sign up with Facebook</Link>
    </div>
  );
};

export default SocialAuthButtons;
