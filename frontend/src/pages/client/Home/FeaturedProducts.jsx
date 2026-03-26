import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/features/ProductCard";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import { Sparkles } from "lucide-react";

const FeaturedProducts = ({ products, loading, onAddToCart }) => {
  return (
    <section id="destaques" className="mt-16 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-pink-600" size={24} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Destaques da Semana
          </h2>
        </div>
        <Link to="/menu">
          <Button variant="secondary" size="md">
            Ver Todos
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500">
            Nenhum produto em destaque no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
