// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { scan } from 'react-scan'; // must be imported before React and React DOM

// Components
import App from '@/App.tsx';

// Style
import '@/index.css';

scan({
  enabled: true
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
