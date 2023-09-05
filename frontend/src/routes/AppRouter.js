import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import BookingSummary from '../pages/BookingSummary';
import SignUpPage from '../components/SignUpPage'; // Import the SignUpPage component

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/booking-summary" element={<BookingSummary />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/signup" element={<SignUpPage />} /> {/* Add this line */}
    </Routes>
  );
};

export default AppRouter;
