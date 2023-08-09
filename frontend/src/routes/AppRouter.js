import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import BookingSummary from '../pages/BookingSummary'; // Import BookingSummary

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/booking-summary" element={<BookingSummary />} /> {/* Add this line */}
    </Routes>
  );
};

export default AppRouter;
