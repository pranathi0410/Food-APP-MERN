const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">

        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Confirm Logout
        </h3>

        <p className="text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>

    </div>
  );
};

export default LogoutConfirmModal;