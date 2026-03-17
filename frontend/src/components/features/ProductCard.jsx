import React, { useState } from 'react';
import Button from '../ui/Button';
import { ShoppingCart, Check } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-smooth group animate-slide-up">
      <div className="relative overflow-hidden h-48">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <img
          src={product.image || '/api/placeholder/400/300'}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 transition-smooth ${
          added ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}>
          <Check size={16} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-black">R$ {product.price?.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} className="flex items-center space-x-1">
            <ShoppingCart size={16} />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;