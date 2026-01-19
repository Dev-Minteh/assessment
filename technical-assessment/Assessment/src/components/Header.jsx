import { Link, useNavigate } from "react-router";
import { useCart } from "../context/UseCart";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, LogOut } from "lucide-react";

export default function Header() {
  const { cartItems } = useCart();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  let total = 0;
  cartItems.forEach(item => {
    total = total + item.quantity;
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/products" className="text-2xl font-bold">
          E-commerce
        </Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          
          <Link to="/cart" className="relative flex items-center gap-2">
            <ShoppingCart size={20} />
            {total > 0 && (
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {total}
              </span>
            )}
          </Link>
          
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}