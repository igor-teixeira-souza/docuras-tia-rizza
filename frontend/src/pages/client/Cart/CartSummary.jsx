import React from 'react';
import Button from '../../../components/ui/Button';

const CartSummary = ({ total, onCheckout }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega</span>
          <span>Grátis</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button className="w-full" onClick={onCheckout}>
        Finalizar Pedido
      </Button>
    </div>
  );
};

export default CartSummary;