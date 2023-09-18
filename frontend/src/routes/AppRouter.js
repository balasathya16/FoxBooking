import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import BookingSummary from '../pages/BookingSummary';
import Dashboard from '../components/Dashboard'; // Import the Dashboard component

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/booking-summary" element={<BookingSummary />} />
      <Route path="/terms" element={<Terms />} />
      {/* Add the route for the Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
