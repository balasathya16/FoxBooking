import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth'; // Import the AuthProvider
import './styles/styles.css'; // Import Tailwind CSS from the styles folder

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the App component with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
