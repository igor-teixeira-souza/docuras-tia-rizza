import React from "react";
import Button from "../../../components/ui/Button";
import { Truck, CreditCard } from "lucide-react";

const CartSummary = ({ total, onCheckout }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-3">
        Resumo do Pedido
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Entrega</span>
          <span className="text-green-600 font-medium">Grátis</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span className="text-gray-900">Total</span>
            <span className="text-pink-600">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={onCheckout}>
        Finalizar Pedido
      </Button>

      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <Truck size={14} />
          <span>Entrega em até 2 dias úteis</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CreditCard size={14} />
          <span>Pagamento na entrega</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
  