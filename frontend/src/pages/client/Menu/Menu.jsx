import React, { useState, useEffect } from 'react';
import MenuHeader from './MenuHeader';
import MenuFilters from './MenuFilters';
import ProductGrid from './ProductGrid';
import { productsAPI } from '../../../api/api';
import { useCart } from '../../../hooks/useCart';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      const productsData = response.data || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
      const uniqueCategories = [...new Set(productsData.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
        />
        <ProductGrid products={filteredProducts} loading={loading} onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default Menu;