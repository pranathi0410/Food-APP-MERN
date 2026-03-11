import { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getCartAPI,
  updateQuantityAPI,
  clearCartAPI
} from "../services/cartService";
import { useAuth } from "./AuthContext";



const CartContext = createContext();

export const CartProvider = ({ children }) => {
const { user } = useAuth();
  const [cart, setCart] = useState({
    restaurantId: null,
    items: []
  });

 const cartTotal = cart?.items?.reduce(
  (acc, item) => acc + item.price * item.quantity,0
) || 0;

 const cartItemCount= cart?.items?.reduce(
    (acc,item)=> acc+item.quantity , 0
 ) || 0;

  const fetchCart = async () => {
    if (!user?.id) {
      setCart({
        restaurantId: null,
        items: []
      });
      return;
    }

    try {
      const cartData = await getCartAPI(user.id);
      if (!cartData) {
        setCart({
          restaurantId: null,
          items: []
        });
      } else {
        setCart(cartData);
      }

    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?.id]);

  const addToCart = async (item, resId) => {

    if (!user?.id) return;

    try {

      const payload = {
        userId: user.id,
        resId: Number(resId),
        itemId: item.itemId,
        name: item.name,
        price: item.price
      };

      const result = await addToCartAPI(payload);

      if (result?.message === "cart contains items from another restaurant") {
        return "DIFFERENT_RESTAURANT";
      }

      setCart(result);

      return "SUCCESS";

    } catch (err) {

      console.error("Add to cart error:", err);
      return "ERROR";

    }
  };

  const increaseQuantity = async (itemId) => {

    if (!user?.id) return;

    const payload = {
      userId: user.id,
      itemId,
      action: "increase"
    };

    const updatedCart = await updateQuantityAPI(payload);

    setCart(updatedCart || {
      restaurantId: null,
      items: []
    });
  };

  const decreaseQuantity = async (itemId) => {

    if (!user?.id) return;

    const payload = {
      userId: user.id,
      itemId,
      action: "decrease"
    };

    const updatedCart = await updateQuantityAPI(payload);

    setCart(updatedCart || {
      restaurantId: null,
      items: []
    });
  };

  const clearCart = async () => {
    if (!user?.id) return;
    const updatedCart = await clearCartAPI(user.id);
    setCart(updatedCart || {
      restaurantId: null,
      items: []
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        cartTotal,
        cartItemCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);