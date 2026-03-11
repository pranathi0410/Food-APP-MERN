
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { createOrderApi } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, cartTotal, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleCheckOut = async () => {

  if (!user?.id) return;
  try {
    const result = await createOrderApi({
      userId: user.id
    });
 if (result?.order) {
      clearCart();
      navigate("/order/success", {
        state: result.order
      });

    }

  } catch (error) {
    console.error("Order error:", error);
  }

};

  return (
    <>
      <div className="bg-[#EDEDED] min-h-screen py-10 px-6">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-[#2B2B2B] mb-8">
            Your Cart
          </h2>
          {console.log(cart)}
          {!(cart?.items?.length) ? (
            <p className="text-[#5E5E5E]">
              No items in cart, add items to view
            </p>
          ) : (
            <>
              <div className="space-y-4">

                {cart?.items?.map((item) => (
                  <div
                    key={item.itemId}
                    className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
                  >

                    <div>
                      <h4 className="text-lg font-semibold text-[#2B2B2B]">
                        {item.name}
                      </h4>

                      <p className="text-[#5E5E5E] mt-1">
                        ₹ {item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => decreaseQuantity(item.itemId)}
                        className="w-8 h-8 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="font-semibold text-[#2B2B2B]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.itemId)}
                        className="w-8 h-8 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">

                <h3 className="text-xl font-semibold text-[#2B2B2B]">
                  Total: ₹ {cartTotal}
                </h3>

                <button
                  onClick={handleCheckOut}
                  className="bg-[#F55951] hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Proceed to Checkout
                </button>

              </div>
            </>
          )}

        </div>

      </div>

   
    </>
  );
};

export default Cart;