import React from 'react';

const OrderSummary = ({ items, total }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span>{item.product.name} x{item.quantity}</span>
            <span className="font-medium">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;