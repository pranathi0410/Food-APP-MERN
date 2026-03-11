const CartConfirmModal = ({ item, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[350px] rounded-xl shadow-lg p-6">

        <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3">
          Confirm Add
        </h3>

        <p className="text-[#2B2B2B] font-medium">
          {item.name}
        </p>

        <p className="text-[#5E5E5E] mt-1">
          ₹ {item.price}
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onConfirm}
            className="flex-1 bg-[#F55951] hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Add to Cart
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-[#2B2B2B] py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartConfirmModal;