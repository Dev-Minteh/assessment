import { Link } from "react-router";
import { useCart } from "../context/UseCart";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="mb-4 h-40 bg-gray-200 rounded">
          <img
            src={product.image}
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>
        
        <h3 className="font-bold text-lg mb-2">
          {product.title}
        </h3>
        
        <p className="text-blue-600 font-bold mb-3">
          ${product.price.toFixed(2)}
        </p>
        
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}
