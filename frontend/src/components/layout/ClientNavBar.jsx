import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, Home } from 'lucide-react';

const ClientNavbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/menu', label: 'Menu' },
    { to: '/cart', label: 'Carrinho', icon: ShoppingCart, badge: cartCount },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? 'bg-white shadow-lg' : 'bg-primary'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            Docuras <span className="text-pink-600">Tia Rizza</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg transition-smooth hover:bg-white ${
                  location.pathname === to ? 'bg-white font-semibold' : ''
                }`}
              >
                {Icon && <Icon size={18} />}
                <span>{label}</span>
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-up">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-white transition-smooth">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth hover:bg-white ${
                  location.pathname === to ? 'bg-white' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon size={18} />}
                <span>{label}</span>
                {badge > 0 && (
                  <span className="bg-black text-white text-xs rounded-full px-2 py-0.5">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;