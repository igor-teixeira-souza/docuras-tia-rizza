import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Orders from '../pages/admin/Orders/Orders';
import Products from '../pages/admin/Products/Products';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;