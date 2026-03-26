import React, { useState, useEffect } from "react";
import { productsAPI } from "../../../api/api";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import { toast } from "react-hot-toast";
import { Edit, Trash2, Plus } from "lucide-react";

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

      let productsData = [];

      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        productsData = response.data.products;
      } else if (Array.isArray(response)) {
        productsData = response;
      } else if (response.data && typeof response.data === "object") {
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
        await productsAPI.update(editingProduct.id, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await productsAPI.create(productData);
        toast.success("Produto criado com sucesso!");
      }
      fetchProducts();
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
        fetchProducts();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        const errorMessage =
          error.response?.data?.error || "Erro ao excluir produto";
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Gerenciar Produtos
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total de {products.length} produto(s)
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Conteúdo */}
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">Nenhum produto cadastrado ainda.</p>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Cadastrar primeiro produto
          </Button>
        </div>
      ) : (
        <>
          {/* Versão Desktop - Tabela */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] lg:min-w-full">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr className="border-b border-gray-700">
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr
                        key={product._id}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            {product.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {product.category || "Sem categoria"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-black">
                            R$ {product.price?.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleEdit(product)}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(product._id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Versão Mobile - Cards */}
          <div className="block md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-base font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Categoria</span>
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.category || "Sem categoria"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Preço</span>
                    <span className="text-base font-bold text-black">
                      R$ {product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                    className="flex-1"
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Formulário Modal */}
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
