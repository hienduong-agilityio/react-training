import React from 'react';
import ReactDOM from 'react-dom/client';

// Component
import App from './App.tsx';

// Context
import { PokemonProvider } from '@stores/PokemonProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);
