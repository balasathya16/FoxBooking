import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/tailwind.css';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <div className="App">
       <Header />
       <div className="App-content">
          <AppRouter />
       </div>
       <Footer />
    </div>
  );
};

export default App;
