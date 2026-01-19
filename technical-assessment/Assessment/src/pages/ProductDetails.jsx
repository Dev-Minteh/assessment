import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Could not find product");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 underline flex items-center gap-2 justify-center"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 text-blue-600 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white border border-gray-200 p-6 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-4 rounded flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-80 object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Category: <span className="font-semibold">{product.category}</span>
            </p>

            <div className="bg-blue-100 p-4 rounded mb-6">
              <p className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-blue-600"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}