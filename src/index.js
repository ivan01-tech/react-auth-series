import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContext from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
