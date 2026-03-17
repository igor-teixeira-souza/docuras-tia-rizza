import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/layout/AdminNavBar';
import Footer from '../../components/layout/Footer';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="pt-16 md:ml-64">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;