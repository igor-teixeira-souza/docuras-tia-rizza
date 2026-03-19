import React from "react";
import { Star } from "lucide-react";

const TopProducts = ({ products = [] }) => {
  // ✅ valor padrão
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="mr-2 text-yellow-500" size={20} />
          Produtos Mais Vendidos
        </h2>
        <p className="text-gray-500 text-center py-4">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Star className="mr-2 text-yellow-500" size={20} />
        Produtos Mais Vendidos
      </h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm font-medium mr-3">
                {index + 1}
              </span>
              <span>{product.name}</span>
            </div>
            <span className="font-semibold">{product.quantity} vendidos</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
