import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px] text-center">

        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully
        </h2>

        <p className="text-gray-600 mb-2">
          Order ID:
          <span className="font-semibold text-gray-800 ml-1">
            {order?._id}
          </span>
        </p>

        <p className="text-gray-600 mb-2">
          Order Name:
          <span className="font-semibold text-gray-800 ml-1">
            {order?.items?.map((item) => item.name).join(", ")}
          </span>
        </p>

        <p className="text-gray-600 mb-6">
          Total: ₹ {order?.totalAmount}
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="bg-[#F55951] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Continue Browsing
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;