import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserMenu, AuthButtons } from "../features/AuthComponents";

const ClientNavbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/cart", label: "Carrinho", badge: cartCount },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? "bg-white shadow-lg" : "bg-primary"}`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            Doçuras da <span className="text-pink-600">Tia Rizza</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center px-3 py-2 rounded-lg transition-smooth hover:bg-white ${
                  location.pathname === to ? "bg-white font-semibold" : ""
                }`}
              >
                <span>{label}</span>
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-up">
                    {badge}
                  </span>
                )}
                {/* Linha indicadora: só aparece em hover a partir de md */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname === to
                      ? "w-full"
                      : "w-0 md:group-hover:w-full"
                  }`}
                ></div>
              </Link>
            ))}
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white transition-smooth"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map(({ to, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center px-4 py-2 rounded-lg transition-smooth hover:bg-white ${
                  location.pathname === to ? "bg-white" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{label}</span>
                {badge > 0 && (
                  <span className="bg-black text-white text-xs rounded-full px-2 py-0.5 ml-2">
                    {badge}
                  </span>
                )}
                {/* Linha indicadora: no mobile só aparece quando ativa */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                    location.pathname === to ? "w-full" : "w-0"
                  }`}
                ></div>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? <UserMenu mobile /> : <AuthButtons mobile />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
