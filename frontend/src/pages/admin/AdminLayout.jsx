import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSideBar";
import AdminFooter from "../../components/layout/AdminFooter";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`pt-6 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      <AdminFooter sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default AdminLayout;
