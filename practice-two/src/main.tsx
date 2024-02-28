import React from 'react';
import ReactDOM from 'react-dom/client';

// Component
import App from './App.tsx';

// Context
import { AppProvider } from '@stores/PokemonProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
