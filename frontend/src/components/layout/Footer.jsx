import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  MessageSquareIcon,
  ArrowUpCircle,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary mt-16 relative">
      {/* Botão Voltar ao topo */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg hover:shadow-xl transition-smooth p-2 group"
        aria-label="Voltar ao topo"
      >
        <ArrowUpCircle className="w-6 h-6 text-black group-hover:text-pink-600 transition-smooth" />
      </button>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sobre - ocupa 4 colunas em md */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xl font-bold">Doçuras da Tia Rizza</h3>
            <p className="text-gray-700 text-center md:text-left">
              Os melhores doces artesanais da região, feitos com amor e
              ingredientes selecionados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-smooth"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5511950321002?text=Olá!%20Vim%20pelo%20site"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-smooth"
                aria-label="WhatsApp"
              >
                <MessageSquareIcon size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos - 2 colunas */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4">
            <h4 className="font-semibold">Links Rápidos</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-gray-700 hover:text-black transition-smooth"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="text-gray-700 hover:text-black transition-smooth"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="text-gray-700 hover:text-black transition-smooth"
                >
                  Carrinho
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="text-gray-500 hover:text-black transition-smooth text-sm"
                >
                  Área administrativa
                </button>
              </li>
            </ul>
          </div>

          {/* Contato - 3 colunas */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <h4 className="font-semibold">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <Phone size={16} className="flex-shrink-0" />
                <a
                  href="https://wa.me/5511950321002?text=Olá!%20Vim%20pelo%20site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-smooth"
                >
                  (11) 95032-1002
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Mail size={16} className="flex-shrink-0" />
                <span>docurastiarizza@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} className="flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Horário - 3 colunas */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <h4 className="font-semibold">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-700 text-center md:text-left">
              <li>Segunda - Sexta: 8h às 19h</li>
              <li>Sábado: 9h às 17h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            &copy; {currentYear} Doçuras da Tia Rizza. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="/termos" className="hover:text-black transition-smooth">
              Termos de uso
            </a>
            <a
              href="/privacidade"
              className="hover:text-black transition-smooth"
            >
              Política de privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
