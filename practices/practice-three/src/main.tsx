// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import App from './App.tsx';
import { ProjectProvider } from '@/stores/ProjectProvider.tsx';

// Style
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </React.StrictMode>
);
