import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
