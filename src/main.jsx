import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App'; // Make sure App is properly defined and imported
import { AuthProvider } from './contexts/AuthContext.jsx';
import './assets/css/index.css'
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root using the new method

root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
