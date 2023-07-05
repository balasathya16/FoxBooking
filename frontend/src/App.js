import React from 'react';
import Header from './components/Header';
import AnimatedText from './components/HomePage/AnimatedText';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import './styles/Header.css';
import './styles/AnimatedText.css';
import './styles/Footer.css';
import './styles/tailwind.css';
import './styles/GalleryContainer.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <AnimatedText />
        <HomePage /> 
      </div>
      <Footer />
    </div>
  );
};

export default App;
