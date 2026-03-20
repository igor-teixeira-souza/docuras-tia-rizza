import React from "react";

const MenuHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Nosso <span className="text-pink-600">Menu</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Escolha entre nossas deliciosas opções de doces artesanais
      </p>
    </div>
  );
};

export default MenuHeader;
