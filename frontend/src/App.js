import React from 'react';
import Header from '../src/components/Header';
import '../src/styles/Header.css'; // Import any additional global CSS styles
import '../src/styles/tailwind.css'; // Import any additional global CSS styles


const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        {/* Add your other components and content here */}
      </div>
      <footer className="App-footer">
        {/* Add your footer component or content here */}
      </footer>
    </div>
  );
};

export default App;
