import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { viewOrderApi } from "../services/orderService";

const OrderList = () => {

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      if (!user?.id) return;

      const data = await viewOrderApi(user.id);

      setOrders(data);

       console.log(data)
    };

    fetchOrders();

  }, [user?.id]);

  return (

    <div className="bg-[#EDEDED] min-h-screen py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-[#2B2B2B] mb-8">
          Your Orders
        </h2>

        {orders.length === 0 ? (

          <p className="text-[#5E5E5E]">
            No orders placed yet.
          </p>

        ) : (

          <div className="space-y-4">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white p-5 rounded-xl shadow-sm"
              >

                <div className="flex justify-between items-center mb-2">

                  <p className="font-semibold text-[#2B2B2B]">
                    Order #{order._id.slice(-6)}
                  </p>

                  <span className="text-sm font-semibold text-green-600">
                    {order.status}
                  </span>

                </div>

                <p className="text-gray-600 text-sm mb-1">
                  Items: {order.items.map((item) => item.name).join(", ")}
                </p>

                <p className="text-gray-600 text-sm mb-1">
                  Total: ₹ {order.totalAmount}
                </p>

                <p className="text-gray-400 text-xs">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default OrderList;