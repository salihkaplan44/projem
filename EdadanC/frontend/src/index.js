import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createRoutesFromChildren, 
  matchRoutes, 
  useLocation, 
  useNavigationType,
  useRoutes
} from 'react-router-dom';
import './assets/styles/global.css';
import App from './App';

// React Router future flags
window.__v7_startTransition = true;
window.__v7_relativeSplatPath = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 