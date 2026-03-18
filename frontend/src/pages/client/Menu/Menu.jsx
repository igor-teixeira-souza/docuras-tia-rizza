import React, { useState, useEffect } from "react";
import MenuHeader from "./MenuHeader";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import { productsAPI } from "../../../api/api";
import { useCart } from "../../../hooks/useCart";

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

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortOption, setSortOption] = useState("default");
  const { addToCart } = useCart();

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
    const range = PRICE_RANGES.find((r) => r.value === value);

    if (range) {
      setPriceMin(range.min);
      setPriceMax(range.max);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, priceMin, priceMax, sortOption, products]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      const productsData = response.data?.data || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
      const uniqueCategories = [
        ...new Set(productsData.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProducts([]);
      setFilteredProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      );
    }

    if (priceMin > 0) {
      filtered = filtered.filter((p) => p.price >= priceMin);
    }

    if (priceMax > 0) {
      filtered = filtered.filter((p) => p.price <= priceMax);
    }

    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="pt-16">
      <div className="container-custom py-8">
        <MenuHeader />
        <MenuFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={handlePriceRangeChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        <ProductGrid
          products={filteredProducts}
          loading={loading}
          onAddToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default Menu;
