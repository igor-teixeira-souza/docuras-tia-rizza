import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import Button from "../../../components/ui/Button";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-primary to-white">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4 transform transition-all hover:scale-105 duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShoppingBag size={40} className="text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 mb-6">
            Que tal explorar nosso menu e escolher deliciosos doces?
          </p>
          <Button variant="primary" onClick={() => navigate("/menu")}>
            Explorar Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-primary to-white">
      <div className="container-custom py-6 sm:py-8">
        {/* Cabeçalho com contador e resumo */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Seu Carrinho
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Revise seus itens antes de finalizar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 px-4 py-2 rounded-full">
                <span className="text-pink-600 font-semibold">
                  {cartCount} {cartCount === 1 ? "item" : "itens"}
                </span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-semibold">
                  Total: R$ {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Coluna da esquerda - Lista de itens */}
          <div className="lg:col-span-2 space-y-4">
            <CartList
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => navigate("/menu")}
                className="group"
              >
                <ArrowLeft
                  size={16}
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                />
                Continuar Comprando
              </Button>
              <Button variant="danger" onClick={clearCart} className="group">
                <Trash2
                  size={16}
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                Limpar Carrinho
              </Button>
            </div>
          </div>

          {/* Coluna da direita - Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary
                total={cartTotal}
                onCheckout={() => navigate("/checkout")}
              />

              {/* Informações adicionais */}
              <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-[10px]">✓</span>
                  </div>
                  <span>Frete grátis para toda São Paulo</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-[10px]">✓</span>
                  </div>
                  <span>Pagamento na entrega</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-[10px]">✓</span>
                  </div>
                  <span>Entrega em até 2 dias úteis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner de frete (opcional) */}
        {cartTotal >= 50 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
            <p className="text-green-700 font-medium">
              🎉 Parabéns! Você ganhou frete grátis!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
