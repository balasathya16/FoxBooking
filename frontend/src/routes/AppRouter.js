// src/routes/AppRouter.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import PrivacyPolicy from '../pages/PrivacyPolicy'; // Import the PrivacyPolicy component

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      {/* Add the route for the Privacy Policy page */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default AppRouter;
