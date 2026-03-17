import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientNavbar from '../../components/layout/ClientNavBar';
import Footer from '../../components/layout/Footer';
import { useCart } from '../../hooks/useCart';

const ClientLayout = () => {
  const { cartCount } = useCart();
  return (
    <div className="min-h-screen bg-primary">
      <ClientNavbar cartCount={cartCount} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientLayout;