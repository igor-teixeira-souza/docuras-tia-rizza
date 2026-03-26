import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, ShoppingCart, Shield, Heart } from "lucide-react";
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-primary via-primary/95 to-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-black hover:text-pink-600 transition-colors group"
          >
            Doçuras da{" "}
            <span className="text-pink-600 group-hover:text-black transition-colors">
              Tia Rizza
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(({ to, label, badge, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                  location.pathname === to
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-white/80 hover:text-black"
                }`}
              >
                {Icon && <Icon size={18} className="mr-1.5" />}
                <span className="text-sm font-medium">{label}</span>
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 animate-scale-up shadow-sm">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname === to
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* Link Admin */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`group relative flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                  location.pathname.startsWith("/admin")
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-white/80 hover:text-black"
                }`}
              >
                <Shield size={18} className="mr-1.5" />
                <span className="text-sm font-medium">Admin</span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname.startsWith("/admin")
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )}

            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/80 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-200 bg-white/95 rounded-b-2xl">
            {navLinks.map(({ to, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  location.pathname === to
                    ? "bg-pink-50 font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-800">{label}</span>
                {badge > 0 && (
                  <span className="bg-pink-600 text-white text-xs font-bold rounded-full px-2.5 py-1">
                    {badge}
                  </span>
                )}
              </Link>
            ))}

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  location.pathname.startsWith("/admin")
                    ? "bg-pink-50 font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Shield size={18} className="mr-2 text-pink-600" />
                <span className="text-gray-800">Admin</span>
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-gray-100">
              {isAuthenticated ? <UserMenu mobile /> : <AuthButtons mobile />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
