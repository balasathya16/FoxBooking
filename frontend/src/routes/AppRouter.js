// routes/AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Update the import statement
import HomePage from '../components/HomePage/HomePage';
import ListingDetailsPage from '../pages/ListingDetailsPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
