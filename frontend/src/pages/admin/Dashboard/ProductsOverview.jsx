import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../../api/api";
import { Package, Plus } from "lucide-react";
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Package className="mr-2 text-pink-600" size={20} />
          Produtos
        </h3>
        <Link
          to="/admin/products"
          className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center"
        >
          Ver todos <Plus size={16} className="ml-1" />
        </Link>
      </div>
      <div className="mb-4">
        <p className="text-3xl font-bold">{products.length}</p>
        <p className="text-sm text-gray-500">Total de produtos cadastrados</p>
      </div>
      {products.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Últimos adicionados:
          </p>
          <ul className="space-y-2">
            {products.slice(0, 3).map((product) => (
              <li key={product._id} className="flex items-center text-sm">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                <span className="flex-1">{product.name}</span>
                <span className="text-gray-500">
                  R$ {product.price?.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductsOverview;
