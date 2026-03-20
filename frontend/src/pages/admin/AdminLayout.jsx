import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSideBar";
import AdminFooter from "../../components/layout/AdminFooter";

const AdminLayout = () => {
  // Detecta se é desktop (>= 768px) para definir o estado inicial da sidebar
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isDesktop={isDesktop}
      />
      {/* Overlay para fechar no mobile */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      <main
        className={`pt-6 transition-all duration-300 ${
          isDesktop && sidebarOpen ? "md:ml-64" : isDesktop ? "md:ml-20" : ""
        }`}
      >
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
      <AdminFooter sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default AdminLayout;
