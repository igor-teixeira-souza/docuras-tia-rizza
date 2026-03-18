import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const handleScrollToDestaques = (e) => {
    e.preventDefault();
    const element = document.getElementById('destaques');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center md:justify-start md:pt-24 text-center md:text-left bg-gradient-to-br from-pink-50 via-white to-pink-100 mb-16">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1600/900')] bg-cover bg-center opacity-30" />
      <div className="relative z-10 max-w-5xl w-full px-6 py-20 md:py-16">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Descubra os <span className="text-pink-600">melhores doces</span> da região
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0 mb-10">
            Artesanais, fresquinhos e feitos com carinho para cada ocasião. Explore nosso cardápio e deixe-se apaixonar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link to="/menu" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-900 transition">
              Conhecer o menu
            </Link>
            <a href="#destaques" onClick={handleScrollToDestaques} className="inline-flex items-center justify-center rounded-full border border-black px-8 py-3 text-sm font-semibold text-black hover:bg-black hover:text-white transition">
              Ver destaques
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;