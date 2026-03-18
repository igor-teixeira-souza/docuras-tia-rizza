// src/components/ui/LoadingScreen.jsx
import React from 'react';
import Loader from './Loader';

const LoadingScreen = ({ message = 'Carregando...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      <Loader size="lg" />
      <p className="mt-4 text-gray-600 text-lg animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingScreen;