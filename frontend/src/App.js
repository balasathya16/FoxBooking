import React, { useState } from 'react';
import Footer from './components/Footer';
import AppRouter from './routes/AppRouter';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

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
