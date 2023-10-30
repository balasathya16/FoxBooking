import React, { useState } from 'react';
import Header from '../src/components/Header';
import Footer from './components/Footer';
import AppRouter from './routes/AppRouter';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <div className="App-content">
        <AppRouter searchResults={searchResults} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
