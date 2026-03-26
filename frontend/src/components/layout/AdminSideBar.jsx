import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar, isDesktop }) => {
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/orders", label: "Pedidos", icon: ShoppingBag },
    { to: "/admin/products", label: "Produtos", icon: Package },
    { to: "/admin/promotions", label: "Promoções", icon: Tag },
    { to: "/admin/settings", label: "Configurações", icon: Settings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDesktop ? "md:translate-x-0" : ""}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo e botões */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-pink-50/80 to-white/80 backdrop-blur-sm">
            {isOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <h2 className="text-xl font-bold text-pink-600">Admin</h2>
              </div>
            ) : (
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {!isDesktop && (
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={20} />
                </button>
              )}
              {isDesktop && (
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                  aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
                >
                  {isOpen ? (
                    <ChevronLeft size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => !isDesktop && toggleSidebar?.()}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive(item.to)
                        ? "bg-black text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {isOpen && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/"
              onClick={() => !isDesktop && toggleSidebar?.()}
              className={`flex items-center rounded-xl transition-all duration-200 ${
                !isOpen ? "justify-center" : ""
              } text-gray-700 hover:bg-red-50 hover:text-red-600 group`}
            >
              <div className="flex items-center px-4 py-3 rounded-xl w-full">
                <LogOut size={20} className="flex-shrink-0" />
                {isOpen && (
                  <span className="ml-3 text-sm font-medium">Sair</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
