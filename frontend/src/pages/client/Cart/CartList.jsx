import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import CartList from './CartList';
import CartSummary from './CartSummary';
import Button from '../../../components/ui/Button';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">Que tal explorar nosso menu e escolher deliciosos doces?</p>
          <Link to="/menu"><Button>Ver Menu</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho ({cartCount} itens)</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={() => navigate('/menu')} className="flex items-center space-x-2">
                <ArrowLeft size={16} /><span>Continuar Comprando</span>
              </Button>
              <Button variant="danger" onClick={clearCart} className="flex items-center space-x-2">
                <Trash2 size={16} /><span>Limpar Carrinho</span>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <CartSummary total={cartTotal} onCheckout={() => navigate('/checkout')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;