import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  let total = 0;
  cartItems.forEach(item => {
    total = total + (item.price * item.quantity);
  });


  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold mb-2">Cart is Empty</h1>
        <p className="text-gray-600 mb-6">No items in your cart</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 p-4 rounded flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="p-2 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>


            <div className="text-right w-24">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded mb-6">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={clearCart}
          className="w-full bg-red-600 text-white py-2 rounded mb-3"
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate('/products')}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}