import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">Docuras Tia Rizza</h3>
            <p className="text-gray-700 mb-4">
              Os melhores doces artesanais da região, feitos com amor e ingredientes selecionados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-600 transition-smooth"><Instagram size={20} /></a>
              <a href="#" className="hover:text-pink-600 transition-smooth"><Facebook size={20} /></a>
              <a href="#" className="hover:text-pink-600 transition-smooth"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-700 hover:text-black transition-smooth">Home</Link></li>
              <li><Link to="/menu" className="text-gray-700 hover:text-black transition-smooth">Menu</Link></li>
              <li><Link to="/cart" className="text-gray-700 hover:text-black transition-smooth">Carrinho</Link></li>
              <li><Link to="/admin" className="text-gray-700 hover:text-black transition-smooth">Admin</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-700"><Phone size={16} /><span>(11) 99999-9999</span></li>
              <li className="flex items-center space-x-2 text-gray-700"><Mail size={16} /><span>contato@docurastiarizza.com</span></li>
              <li className="flex items-center space-x-2 text-gray-700"><MapPin size={16} /><span>São Paulo, SP</span></li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-700">
              <li>Segunda - Sexta: 8h às 19h</li>
              <li>Sábado: 9h às 17h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Docuras Tia Rizza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;