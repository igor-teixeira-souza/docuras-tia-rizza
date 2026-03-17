import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bem-vindo à <span className="text-pink-600">Docuras Tia Rizza</span>
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        Os doces mais deliciosos e artesanais da região, feitos com amor e ingredientes selecionados
      </p>
    </div>
  );
};

export default HeroSection;