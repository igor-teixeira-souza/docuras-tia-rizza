import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;