import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { isProduction } from '@/utils/environment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker in production
if (isProduction() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('[PWA] Service Worker registered successfully');
      })
      .catch(error => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  });
}
