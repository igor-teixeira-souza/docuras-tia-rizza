import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogIn, UserPlus, LogOut, Settings } from 'lucide-react';

/* ================= USER MENU ================= */

const UserMenu = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white transition-smooth"
      >
        <User size={20} />
        <span>{user?.name}</span>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
            <div className="py-2">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                <Settings size={16} />
                <span>Perfil</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} />
                  <span>Admin</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ================= AUTH BUTTONS (CORRIGIDO) ================= */

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-2">
      
      <Link
        to="/login"
        className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white transition-smooth"
      >
        <LogIn size={16} />
        <span>Entrar</span>
      </Link>

      <Link
        to="/register"
        className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white transition-smooth"
      >
        <UserPlus size={16} />
        <span>Cadastrar</span>
      </Link>

    </div>
  );
};

export { UserMenu, AuthButtons };