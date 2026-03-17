import React from 'react';
import ProductCard from '../../../components/features/ProductCard';
import Loader from '../../../components/ui/Loader';

const ProductGrid = ({ products, loading, onAddToCart }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;