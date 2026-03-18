import React, { useState, useEffect } from 'react';
import PromoBanner from '../../../components/features/PromoBanner';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import QualityCards from './QualityCards';
import { productsAPI } from '../../../api/api';
import { useCart } from '../../../hooks/useCart';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        const products = response.data.data || [];
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="pt-16">
      <HeroSection />
      <div className="container-custom py-8">
        <PromoBanner />
        <FeaturedProducts products={featuredProducts} loading={loading} onAddToCart={addToCart} />
        <QualityCards />
      </div>
    </div>
  );
};

export default Home;