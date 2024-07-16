import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthContextProvider>
    <App/>
  </AuthContextProvider>  
    <Toaster position="top-right" reverseOrder={false} />
  </BrowserRouter>   
  </React.StrictMode>
);


