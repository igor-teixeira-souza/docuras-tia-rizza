import React, { useState, useEffect } from "react";
import { productsAPI } from "../../../api/api";
import { useCart } from "../../../hooks/useCart";
import MenuHeader from "./MenuHeader";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import Loader from "../../../components/ui/Loader";
import { toast } from "react-hot-toast";

const priceRanges = [
  { min: null, max: null },
  { min: 0, max: 20 },
  { min: 20, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: null },
];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // índice 0 = todos
  const [sortBy, setSortBy] = useState("name_asc");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, selectedPriceRange, sortBy, products]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      let productsData = [];
      if (Array.isArray(response.data)) productsData = response.data;
      else if (response.data?.products) productsData = response.data.products;
      else productsData = [];

      setProducts(productsData);
      const cats = [
        ...new Set(productsData.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(cats);
    } catch (err) {
      setError("Erro ao carregar produtos.");
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Faixa de preço
    const { min, max } = priceRanges[selectedPriceRange];
    if (min !== null) {
      filtered = filtered.filter((p) => p.price >= min);
    }
    if (max !== null) {
      filtered = filtered.filter((p) => p.price <= max);
    }

    // Ordenação
    const [field, order] = sortBy.split("_");
    filtered.sort((a, b) => {
      if (field === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (field === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="pt-16">
        <div className="container-custom py-8">
          <MenuHeader />
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16">
        <div className="container-custom py-8">
          <MenuHeader />
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
          onPriceRangeChange={setSelectedPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default Menu;
