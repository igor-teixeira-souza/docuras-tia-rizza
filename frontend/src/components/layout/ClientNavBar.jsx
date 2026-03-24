import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, ShoppingCart, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserMenu, AuthButtons } from "../features/AuthComponents";

const ClientNavbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home", icon: null },
    { to: "/menu", label: "Menu", icon: null },
    { to: "/cart", label: "Carrinho", badge: cartCount, icon: ShoppingCart },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-primary/90 to-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-black hover:text-pink-600 transition-colors"
          >
            Doçuras da <span className="text-pink-600">Tia Rizza</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(({ to, label, badge, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === to
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-white/70 hover:text-black"
                }`}
              >
                {Icon && <Icon size={18} className="mr-1" />}
                <span>{label}</span>
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-up shadow-sm">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
                {/* Linha indicadora */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname === to
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* Link Admin – apenas para admins */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`group relative flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.startsWith("/admin")
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-white/70 hover:text-black"
                }`}
              >
                <Shield size={18} className="mr-1" />
                <span>Admin</span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname.startsWith("/admin")
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )}

            {/* Componentes de autenticação (UserMenu ou AuthButtons) */}
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/70 transition-all"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            {navLinks.map(({ to, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  location.pathname === to
                    ? "bg-white font-semibold"
                    : "hover:bg-white/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{label}</span>
                {badge > 0 && (
                  <span className="bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Link Admin mobile */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith("/admin")
                    ? "bg-white font-semibold"
                    : "hover:bg-white/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Shield size={18} className="mr-2" />
                <span>Admin</span>
              </Link>
            )}

            {/* Componentes de autenticação para mobile */}
            <div className="pt-2 border-t border-gray-200">
              {isAuthenticated ? <UserMenu mobile /> : <AuthButtons mobile />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
