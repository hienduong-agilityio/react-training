// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Options, scan } from 'react-scan'; // must be imported before React and React DOM

// Components
import App from '@/App.tsx';

// Style
import '@/index.css';

scan({
  enabled: import.meta.env.DEV, // Enable only dev
  log: true, // Log debug
  trace: true,
  highlight: true, // Highlight component re-render
  name: true, // component re-render
  props: true // Prop make to re-render
} as Options);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
