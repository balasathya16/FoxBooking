import React from 'react';
import Header from './components/Header';
import AnimatedText from './components/HomePage/AnimatedText';
import Footer from './components/Footer'; // Import the Footer component
import './styles/Header.css';
import './styles/AnimatedText.css';
import './styles/Footer.css'; // Import the Footer component's CSS
import './styles/tailwind.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <AnimatedText />
        {/* Add your other components and content here */}
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default App;
