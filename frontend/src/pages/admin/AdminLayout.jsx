import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSideBar";
import AdminFooter from "../../components/layout/AdminFooter";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Botão flutuante do menu (apenas em mobile e quando sidebar está fechada) */}
      {!isDesktop && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-all duration-200 md:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      )}

      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isDesktop={isDesktop}
      />

      {/* Overlay com blur suave */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      <main
        className={`transition-all duration-300 ${
          isDesktop && sidebarOpen ? "md:ml-64" : isDesktop ? "md:ml-20" : ""
        }`}
      >
        <div className="p-4 sm:p-6 pt-16 md:pt-6">
          <Outlet />
        </div>
      </main>

      <AdminFooter sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default AdminLayout;
