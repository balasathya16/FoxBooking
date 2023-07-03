import React from 'react';
import Header from './components/Header';
import AnimatedText from './components/HomePage/AnimatedText';
import './styles/Header.css'; // Import any additional global CSS styles
import './styles/AnimatedText.css'; // Import the AnimatedText component's CSS
import './styles/tailwind.css'; // Import any additional global CSS styles

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <AnimatedText /> {/* Add the AnimatedText component */}
        {/* Add your other components and content here */}
      </div>
      <footer className="App-footer">
        {/* Add your footer component or content here */}
      </footer>
    </div>
  );
};

export default App;
