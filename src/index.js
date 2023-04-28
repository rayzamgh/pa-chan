import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { VolumeProvider } from './VolumeContext'; // Import VolumeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VolumeProvider> {/* Wrap App with VolumeProvider */}
      <App />
    </VolumeProvider>
  </React.StrictMode>
);

reportWebVitals();