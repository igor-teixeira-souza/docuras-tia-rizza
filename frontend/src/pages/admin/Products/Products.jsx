import React, { useState, useEffect } from "react";
import { productsAPI } from "../../../api/api";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import { toast } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getAll();
      console.log("Resposta completa da API /products:", response);

      // Estratégia para extrair o array de produtos, independente da estrutura
      let productsData = [];

      if (Array.isArray(response.data)) {
        // Se a resposta for { data: [...] }
        productsData = response.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        // Se for { data: { products: [...] } }
        productsData = response.data.products;
      } else if (Array.isArray(response)) {
        // Se a resposta for diretamente o array (caso o axios já tenha extraído)
        productsData = response;
      } else if (response.data && typeof response.data === "object") {
        // Tentar encontrar um array dentro do objeto
        const possibleArrays = Object.values(response.data).filter(
          Array.isArray,
        );
        if (possibleArrays.length > 0) {
          productsData = possibleArrays[0];
        } else {
          console.warn("Formato inesperado da resposta:", response.data);
        }
      }

      console.log("Produtos extraídos:", productsData);
      setProducts(productsData);
      if (productsData.length === 0) {
        toast.info("Nenhum produto cadastrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar produtos";
      setError(errorMessage);
      toast.error(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        // Atualizar produto existente
        await productsAPI.update(editingProduct.id, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        // Criar novo produto
        await productsAPI.create(productData);
        toast.success("Produto criado com sucesso!");
      }
      fetchProducts(); // Recarrega a lista
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      const errorMessage =
        error.response?.data?.error || "Erro ao salvar produto";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await productsAPI.delete(id);
        toast.success("Produto excluído com sucesso!");
        fetchProducts(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        const errorMessage =
          error.response?.data?.error || "Erro ao excluir produto";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <Button onClick={() => setShowForm(true)}>Novo Produto</Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">Nenhum produto cadastrado ainda.</p>
          <Button onClick={() => setShowForm(true)}>
            Cadastrar primeiro produto
          </Button>
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
