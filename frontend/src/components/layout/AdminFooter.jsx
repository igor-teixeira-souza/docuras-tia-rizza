import React from "react";
import { Heart } from "lucide-react";

const AdminFooter = ({ sidebarOpen }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-white border-t border-gray-200 py-4 px-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>&copy; {currentYear} Doçuras da Tia Rizza.</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            Feito com{" "}
            <Heart size={14} className="text-pink-500 fill-pink-500" /> para
            você
          </span>
        </div>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="/termos" className="hover:text-pink-600 transition-colors">
            Termos
          </a>
          <a
            href="/privacidade"
            className="hover:text-pink-600 transition-colors"
          >
            Privacidade
          </a>
          <a href="/ajuda" className="hover:text-pink-600 transition-colors">
            Ajuda
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
