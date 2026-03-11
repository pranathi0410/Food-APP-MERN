import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const GlobalCartBar = () => {
  const { cart } = useCart();
  const location = useLocation();

  if (
    location.pathname === "/cart" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  )
    return null;

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  if (!totalItems) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <span className="text-[#2B2B2B] font-semibold">
          {totalItems} item(s) added
        </span>

        <Link
          to="/cart"
          className="bg-[#F55951] hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          VIEW CART
        </Link>

      </div>

    </div>
  );
};

export default GlobalCartBar;