import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientLayout from '../pages/client/ClientLayout';
import Home from '../pages/client/Home/Home';
import Menu from '../pages/client/Menu/Menu';
import Cart from '../pages/client/Cart/Cart';
import Checkout from '../pages/client/Checkout/Checkout';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;