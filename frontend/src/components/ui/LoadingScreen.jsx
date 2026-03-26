import React from "react";
import Loader from "./Loader";

const LoadingScreen = ({ message = "Carregando..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-primary to-white flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <Loader size="lg" />
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
          {message}
        </p>
        <p className="mt-2 text-gray-400 text-sm">Aguarde um momento...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
