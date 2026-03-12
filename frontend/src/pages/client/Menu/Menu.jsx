import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function Menu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await api.get("/products");

    console.log(response.data);

    setProducts(response.data.products);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cardápio 🍰</h1>

      <div className="grid grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
      </div>
    </div>
  );
}
