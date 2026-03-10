export default function ProductCard({ product, addToCart }) {

  return (

    <div className="bg-white shadow-md rounded-xl p-4">

      <img
        src={`http://localhost:3000/images/${product.image}`}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="text-lg font-semibold mt-2">
        {product.name}
      </h3>

      <p className="text-gray-500">
        {product.description}
      </p>

      <p className="text-pink-600 font-bold mt-2">
        R$ {product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg"
      >
        Adicionar
      </button>

    </div>

  );

}