import React from "react";
import Button from "../ui/Button";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  // Placeholder confiável e funcional
  const placeholderImage =
    "https://placehold.co/96x96?text=Doçuras+Tia+Rizza&bg=FFE4E1&text_color=000000";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Imagem responsiva */}
        <div className="flex-shrink-0 flex justify-center">
          <div className="w-24 h-24 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image || placeholderImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = placeholderImage;
              }}
            />
          </div>
        </div>

        {/* Informações */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg break-words">
                {product.name}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                R$ {product.price.toFixed(2)} / unidade
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-bold text-pink-600 text-base sm:text-lg">
                R$ {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Controles de quantidade */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  onUpdateQuantity(product.id || product._id, quantity - 1)
                }
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-200 flex items-center justify-center border border-gray-200"
                aria-label="Diminuir quantidade"
              >
                <span className="text-lg font-medium">-</span>
              </button>
              <span className="w-10 text-center font-medium text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(product.id || product._id, quantity + 1)
                }
                className="w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center border border-gray-200"
                aria-label="Aumentar quantidade"
              >
                <span className="text-lg font-medium">+</span>
              </button>
            </div>

            {/* Botão Remover */}
            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemove(product.id || product._id)}
              className="w-full sm:w-auto"
            >
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
