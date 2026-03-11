import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import LogoutConfirmModal from "./LogoutConfirmModal";

function Header() {
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  console.log(user)

  return (
    <header className="bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="h-12 w-auto" src={logo} alt="logo" />
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8 text-[#2B2B2B] font-medium">

          <li>
            <Link to="/" className="hover:text-[#F55951] transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-[#F55951] transition">
              Contact
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-[#F55951] transition">
              About Us
            </Link>
          </li>

          <li>
            <Link to="/cart" className="hover:text-[#F55951] transition">
              Cart 🛒
            </Link>
            {cartItemCount > 0 && (
              <span className=" bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </li>
 <Link to="/orders" className="hover:text-[#F55951] transition">
              Orders
            </Link>
          <li>

          </li>

          {user && (
            <li className="text-[#F55951] font-semibold">
              Hello, {user.name} 🖤
            </li>
          )}



          <li>
            {user ? (
              <button
                onClick={() => setShowLogOutModal(true)}
                className="bg-[#F55951] hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#F55951] hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
              >
                Login
              </Link>
            )}
          </li>
          {showLogOutModal  && (
            <LogoutConfirmModal
              onCancel={() => setShowLogOutModal(false)}
              onConfirm={() => {
                logout();
                setShowLogOutModal(false);
              }}
            />
          )}

        </ul>

      </div>
    </header>
  );
}

export default Header;