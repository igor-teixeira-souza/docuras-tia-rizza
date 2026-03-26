import React from "react";
import CartItem from "../../../components/features/CartItem";

const CartList = ({ items, onUpdateQuantity, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.product.id || item.product._id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;