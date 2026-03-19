import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Orders from "../pages/admin/Orders/Orders";
import Products from "../pages/admin/Products/Products";
import Promotions from "../pages/admin/promotions/Promotions";
import Settings from "../pages/admin/settings/Settings";
import AdminRoute from "./AdminRoute"; // <-- caminho corrigido

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
