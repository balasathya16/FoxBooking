import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Regiser';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import SocialAuthButtons from './components/Auth/SocialAuthButtons';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <SocialAuthButtons />
    </BrowserRouter>
  );
};

export default AppRoutes;
