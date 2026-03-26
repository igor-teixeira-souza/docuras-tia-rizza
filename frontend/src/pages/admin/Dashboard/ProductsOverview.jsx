import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../../api/api";
import { Package, Plus, TrendingUp } from "lucide-react";
import Loader from "../../../components/ui/Loader";

const ProductsOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader size="sm" />;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-pink-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Package className="text-pink-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Produtos</h3>
          </div>
          <Link
            to="/admin/products"
            className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1 group"
          >
            <span>Ver todos</span>
            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Estatísticas */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
            {products.length > 0 && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                ativos
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">Total de produtos cadastrados</p>
        </div>

        {/* Últimos produtos */}
        {products.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-gray-400" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Últimos adicionados
              </p>
            </div>
            <div className="space-y-3">
              {products.slice(0, 3).map((product, index) => (
                <div
                  key={product._id}
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-pink-600">
                        #{index + 1}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {product.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 ml-2">
                    R$ {product.price?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Indicador de mais produtos */}
            {products.length > 3 && (
              <div className="mt-3 pt-2 text-center">
                <span className="text-xs text-gray-400">
                  + {products.length - 3} outros produtos
                </span>
              </div>
            )}
          </div>
        )}

        {/* Estado vazio */}
        {products.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">Nenhum produto cadastrado</p>
            <Link
              to="/admin/products"
              className="inline-block mt-3 text-sm text-pink-600 hover:text-pink-700 font-medium"
            >
              Adicionar primeiro produto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsOverview;