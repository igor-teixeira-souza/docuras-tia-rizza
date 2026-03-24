import React, { useState, useEffect } from "react";
import PromoBanner from "../../../components/features/PromoBanner";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import QualityCards from "./QualityCards";
import { productsAPI } from "../../../api/api";
import { settingsAPI } from "../../../api/api"; // importe settingsAPI
import { useCart } from "../../../hooks/useCart";
import Loader from "../../../components/ui/Loader";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Carregar produtos em destaque
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await productsAPI.getAll();
        const products = Array.isArray(response.data) ? response.data : [];
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        setError("Erro ao carregar produtos em destaque.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Carregar configurações do site (incluindo a imagem da hero)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        setSettings(response.data);
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
        // Não exibe erro ao usuário, apenas usa fallback sem imagem
      }
    };
    fetchSettings();
  }, []);

  if (error) {
    return (
      <div className="pt-16 container-custom py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section com imagem vinda das configurações */}
      <HeroSection imageUrl={settings?.heroImage} />

      <div className="container-custom py-8">
        <PromoBanner />
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : (
          <FeaturedProducts
            products={featuredProducts}
            onAddToCart={addToCart}
          />
        )}
        <QualityCards />
      </div>
    </div>
  );
};

export default Home;
