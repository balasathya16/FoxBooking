// Routes.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Regiser';
import Login from './components/Auth/Login'; // Add the import for Login component

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Define other routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
