import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartConfirmModal from "./CartConfirmModal";
import ReplaceCartModal from "./ReplaceCartModal";
import { useCart } from "../Context/CartContext";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [showReplacedAlert, setShowReplacedAlert] = useState(false);

  const { addToCart,clearCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/restaurant/menu/${resId}`
        );

        if (!res.ok) throw new Error("Menu fetch failed");

        const data = await res.json();

        setRestaurantName(data.restaurantName);
        setMenuItems(data.menu);

      } catch (err) {
        console.log("Menu fetch error:", err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="bg-[#EDEDED] min-h-screen px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-[#2B2B2B] mb-8">
          {restaurantName}
        </h1>

        <div className="space-y-4">

          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
            >

              <div>
                <h3 className="text-lg font-semibold text-[#2B2B2B]">
                  {item.name}
                </h3>

                <p className="text-[#5E5E5E]">
                  ₹ {item.price}
                </p>
              </div>

              <button
                className="bg-[#F55951] hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
                onClick={() => setSelectedItem(item)}
              >
                ADD
              </button>

            </div>
          ))}

        </div>

      </div>

      {selectedItem && (
        <CartConfirmModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={async () => {
            const result = await addToCart(selectedItem, resId);
            if (result === "DIFFERENT_RESTAURANT") {
              setShowReplaceModal(true);
            } else {
              setSelectedItem(null);
              setShowBottomBar(true);
            }

          }}
        />
      )}

      {showReplaceModal && (
        <ReplaceCartModal restaurantName={restaurantName}
          onCancel={() => setShowReplaceModal(false)}
          onConfirm={async () => {
            await clearCart();
            await addToCart(selectedItem, resId);
            setShowReplaceModal(false);
            setSelectedItem(null);
            setShowBottomBar(true);
          }
          }
        />
      )}

      {showReplacedAlert && (
        <div className="fixed bottom-6 right-6 bg-[#F55951] text-white px-5 py-3 rounded-lg shadow-lg">
          Cart replaced successfully ✅
        </div>
      )}

    </div>
  );
};

export default RestaurantMenu;