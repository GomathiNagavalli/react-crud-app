import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Importing Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Optional: Import Bootstrap Icons if needed (requires installing bootstrap-icons)
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
