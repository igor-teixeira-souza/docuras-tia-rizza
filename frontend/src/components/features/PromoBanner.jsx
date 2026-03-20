import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { promotionsAPI } from "../../api/api";
import Button from "../ui/Button";

const PromoBanner = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionsAPI.getAll();
        const data = Array.isArray(response.data) ? response.data : [];
        setPromotions(data.filter((p) => p.active));
      } catch (err) {
        console.error("Erro ao carregar promoções:", err);
        setError(true);
        // Mock para teste
        setPromotions([
          {
            _id: "1",
            title: "50% OFF EM BOLOS",
            description:
              "Todos os bolos com 50% OFF — aproveite antes que acabe!",
            link: "/menu",
            active: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotions]);

  if (loading)
    return <div className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>;
  if (!promotions.length) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-8">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div
            key={promo._id}
            className="w-full flex-shrink-0 bg-gradient-to-r from-pink-200 to-pink-300 p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between bg-black bg-opacity-30 p-4 rounded-lg">
              <div className="text-center md:text-left mb-4 md:mb-0 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {promo.title}
                </h2>
                <p className="text-xl">{promo.description}</p>
              </div>
              {promo.link && (
                <Link to={promo.link}>
                  <Button className="mt-4">Aproveitar</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      {promotions.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-smooth ${i === currentSlide ? "bg-black w-4" : "bg-gray-400"}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoBanner;
