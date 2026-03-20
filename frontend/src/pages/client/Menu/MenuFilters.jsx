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
      {/* Barra de busca */}
      <div className="relative mb-6">
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

      {/* Botão para abrir/fechar filtros no mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 mb-4"
      >
        <Filter size={18} />{" "}
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      {/* Filtros */}
      <div className={`${showFilters ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Categorias */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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

          {/* Faixas de preço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Faixa de preço
            </label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, idx) => (
                <button
                  key={idx}
                  onClick={() => onPriceRangeChange(idx)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all ${
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-black rounded-lg bg-white hover:bg-gray-100 transition text-black font-medium"
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
