import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { promotionsAPI } from "../../api/api";
import Button from "../ui/Button";

const PromoBanner = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionsAPI.getAll();
        // Filtra apenas promoções ativas e com link
        const activePromos = response.data.filter(
          (promo) => promo.active && promo.link,
        );
        setPromotions(activePromos);
      } catch (error) {
        console.error("Erro ao carregar promoções:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotions]);

  if (loading) {
    return <div className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>; // Skeleton
  }

  if (promotions.length === 0) {
    return null; // Nenhuma promoção ativa
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`w-full flex-shrink-0 bg-gradient-to-r from-pink-200 to-pink-300 p-8`}
            style={{
              backgroundImage: promo.image ? `url(${promo.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between bg-black bg-opacity-30 p-4 rounded-lg">
              <div className="text-center md:text-left mb-4 md:mb-0 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {promo.title}
                </h2>
                <p className="text-xl">{promo.description}</p>
              </div>
              <Link to={promo.link}>
                <Button className="mt-4">Aproveitar</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots de navegação */}
      {promotions.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentSlide ? "bg-black w-4" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoBanner;
