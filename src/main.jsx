import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ou outro arquivo de estilo, se você tiver

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
