import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/orders", label: "Pedidos", icon: ShoppingBag },
    { to: "/admin/products", label: "Produtos", icon: Package },
    { to: "/admin/promotions", label: "Promoções", icon: Tag },
    { to: "/admin/settings", label: "Configurações", icon: Settings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo e botão toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen ? (
            <h2 className="text-xl font-bold text-pink-600">Admin</h2>
          ) : (
            <span className="text-xl font-bold text-pink-600 mx-auto">A</span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-gray-100 transition-smooth"
            aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Informações do usuário */}
        <div className="p-4 border-b">
          <div className={`flex items-center ${!isOpen && "justify-center"}`}>
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            {isOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-3 rounded-lg transition-smooth ${
                    isActive(item.to)
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 transition-smooth ${
              !isOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
