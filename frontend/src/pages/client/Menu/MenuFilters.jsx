import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const PRICE_RANGES = [
  { value: 'all', label: 'Todos os preços', min: 0, max: 0 },
  { value: 'upto-10', label: 'Até R$10', min: 0, max: 10 },
  { value: '10-20', label: 'R$10 - R$20', min: 10, max: 20 },
  { value: '20-30', label: 'R$20 - R$30', min: 20, max: 30 },
  { value: '30-50', label: 'R$30 - R$50', min: 30, max: 50 },
  { value: '50-75', label: 'R$50 - R$75', min: 50, max: 75 },
  { value: '75-100', label: 'R$75 - R$100', min: 75, max: 100 },
  { value: '100+', label: 'Acima de R$100', min: 100, max: 0 },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Padrão' },
  { value: 'price-asc', label: 'Preço: menor para maior' },
  { value: 'price-desc', label: 'Preço: maior para menor' },
  { value: 'name-asc', label: 'Nome: A → Z' },
  { value: 'name-desc', label: 'Nome: Z → A' },
  { value: 'popularity', label: 'Mais populares' },
  { value: 'newest', label: 'Mais recentes' },
];

const MenuFilters = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  sortOption,
  onSortChange,
}) => {
  const [open, setOpen] = useState(false);

  const activeRange =
    PRICE_RANGES.find((range) => range.value === selectedPriceRange) ||
    PRICE_RANGES[0];

  return (
    <div className="bg-white rounded-xl shadow-md mb-5 animate-slide-up w-full">
      <div className="flex flex-col gap-3 p-5 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex shrink-0">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900"
            >
              <SlidersHorizontal size={18} />
              {open ? 'Ocultar filtros' : 'Ver filtros'}
            </button>
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-3 pt-3">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Preço</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => onPriceRangeChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Ordenar</label>
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Categoria</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onCategoryChange('all')}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                      selectedCategory === 'all'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onCategoryChange(cat)}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-black text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuFilters;