// main.jsx ou index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar de 'react-dom/client'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Substituir ReactDOM.render por createRoot
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
