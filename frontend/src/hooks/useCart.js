import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const CART_STORAGE_KEY = '@docuras-cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        return [];
      }
    }
    return [];
  });

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const getProductId = (product) => product?.id || product?._id;

  const addToCart = (product) => {
    const productId = getProductId(product);
    let toastMessage = '';

    setCartItems((prev) => {
      const existing = prev.find((item) => getProductId(item.product) === productId);
      if (existing) {
        toastMessage = 'Quantidade atualizada no carrinho!';
        return prev.map((item) =>
          getProductId(item.product) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toastMessage = 'Produto adicionado ao carrinho!';
      return [...prev, { product: { ...product, id: productId }, quantity: 1 }];
    });

    if (toastMessage) toast.success(toastMessage);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item.product) === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => getProductId(item.product) !== productId));
    toast.success('Produto removido do carrinho!');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho limpo!');
  };

  return {
    cartItems,
    cartTotal,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};