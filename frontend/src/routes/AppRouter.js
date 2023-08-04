// src/routes/AppRouter.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AvailabilityCalendar from '../pages/AvailabilityCalendar'; // Import the AvailabilityCalendar component

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      {/* Add the route for the Availability Calendar page */}
      <Route path="/availability" element={<AvailabilityCalendar />} />
    </Routes>
  );
};

export default AppRouter;
