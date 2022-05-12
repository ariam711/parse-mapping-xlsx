import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
