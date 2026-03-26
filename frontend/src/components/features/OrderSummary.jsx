import React from "react";
import { ShoppingBag, Truck, CreditCard } from "lucide-react";

const OrderSummary = ({ items, total }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4 mb-4">
        <ShoppingBag size={20} className="text-black" />
        <h3 className="text-xl font-bold text-gray-900">Resumo do Pedido</h3>
      </div>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start text-sm py-2 border-b border-gray-100"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.product.name}</p>
              <p className="text-gray-500 text-xs">
                {item.quantity} unidade(s)
              </p>
            </div>
            <p className="font-semibold text-gray-900">
              R$ {(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totais */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Frete</span>
          <span className="text-green-600 font-medium">Grátis</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-black">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Truck size={14} />
          <span>Entrega em até 2 dias úteis</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard size={14} />
          <span>Pagamento na entrega</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
