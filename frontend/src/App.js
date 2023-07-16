import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import for Routes
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import ListingDetails from '../src/pages/ListingDetails'; // Step 1: Import the ListingDetails component
import SignUpPopup from './components/SignUpPopUp';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const closeSignUpPopup = () => {
    setShowSignUp(false);
  };

  return (
    // Step 2: Wrap the entire component with BrowserRouter
    <Router>
      <div className="App">
        <Header />
        <div className="App-content">
          {/* Step 3: Define your routes */}
          <Routes>
            {/* Route for the listing details page */}
            <Route path="/listing/:id" element={<ListingDetails />} />
            {/* Default route for the homepage */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        {showSignUp && <SignUpPopup onClose={closeSignUpPopup} />}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
