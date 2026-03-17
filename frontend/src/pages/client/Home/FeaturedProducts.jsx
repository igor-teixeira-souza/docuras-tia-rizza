import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../components/features/ProductCard';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import { Sparkles, ArrowRight } from 'lucide-react';

const FeaturedProducts = ({ products, loading, onAddToCart }) => {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-pink-600" />
          <h2 className="text-2xl md:text-3xl font-bold">Destaques da Semana</h2>
        </div>
        <Link to="/menu">
          <Button variant="secondary" className="flex items-center space-x-2">
            <span>Ver Todos</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;