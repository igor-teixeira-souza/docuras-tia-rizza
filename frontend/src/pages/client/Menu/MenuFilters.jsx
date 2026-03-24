import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const priceRanges = [
  { label: "Todos", min: null, max: null },
  { label: "Até R$ 20", min: 0, max: 20 },
  { label: "R$ 20 - R$ 50", min: 20, max: 50 },
  { label: "R$ 50 - R$ 100", min: 50, max: 100 },
  { label: "Acima de R$ 100", min: 100, max: null },
];

const MenuFilters = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = () => {
    onCategoryChange("all");
    onSearchChange("");
    onPriceRangeChange(0);
    onSortChange("name_asc");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-up border border-gray-200">
      {/* Barra de pesquisa centralizada */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* Botão para abrir/fechar filtros no mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
        >
          <Filter size={18} />{" "}
          {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {/* Filtros – ocultáveis no mobile, visíveis no desktop */}
      <div className={`${showFilters ? "block" : "hidden md:block"}`}>
        <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-end justify-center">
          {/* Categoria */}
          <div className="w-full md:flex-1 md:min-w-[150px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-white"
            >
              <option value="all">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Faixa de preço */}
          <div className="w-full md:flex-1 md:min-w-[180px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Faixa de preço
            </label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, idx) => (
                <button
                  key={idx}
                  onClick={() => onPriceRangeChange(idx)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all whitespace-nowrap ${
                    selectedPriceRange === idx
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenação */}
          <div className="w-full md:flex-1 md:min-w-[150px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-white"
            >
              <option value="name_asc">Nome (A-Z)</option>
              <option value="name_desc">Nome (Z-A)</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
            </select>
          </div>

          {/* Botão reset */}
          <div className="w-full md:w-auto">
            <button
              onClick={resetFilters}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-black rounded-lg bg-white hover:bg-gray-100 transition text-black font-medium whitespace-nowrap"
            >
              <X size={16} /> Limpar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
