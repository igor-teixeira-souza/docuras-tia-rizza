import React, { useState, useEffect } from "react";
import MenuHeader from "./MenuHeader";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import { productsAPI } from "../../../api/api";
import { useCart } from "../../../hooks/useCart";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const { addToCart } = useCart();

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
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
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
