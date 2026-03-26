import React, { useState } from "react";
import Button from "../ui/Button";
import { Check } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Placeholder confiável
  const placeholderImage =
    "https://placehold.co/400x300?text=Doçuras+Tia+Rizza&bg=FFE4E1&text_color=000000";
  const imageUrl =
    product.image && !imgError ? product.image : placeholderImage;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group animate-slide-up h-full flex flex-col">
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImgError(true)}
        />
        <div
          className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 transition-all duration-300 ${
            added ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <Check size={16} />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            R$ {product.price?.toFixed(2)}
          </span>
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
