import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const promotions = [
    { id: 1, title: 'Doces Especiais', description: '20% OFF em todos os bolos', image: '/api/placeholder/800/300', color: 'from-pink-200 to-pink-300' },
    { id: 2, title: 'Kit Festa', description: 'Compre 10 doces e ganhe 2', image: '/api/placeholder/800/300', color: 'from-purple-200 to-purple-300' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotions.length]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {promotions.map((promo) => (
          <div key={promo.id} className={`w-full flex-shrink-0 bg-gradient-to-r ${promo.color} p-8`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">{promo.title}</h2>
                <p className="text-xl text-gray-800">{promo.description}</p>
                <Link to="/menu"><Button className="mt-4">Aproveitar</Button></Link>
              </div>
              <img src={promo.image} alt={promo.title} className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-smooth ${index === currentSlide ? 'bg-black w-4' : 'bg-gray-400'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;