import React from "react";

const ReplaceCartModal = ({ restaurantName, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>
          Your cart contains items from another restrestaurant : {restaurantName}.
          <br />
          Do you want to replace cart?
        </p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="replace-btn" onClick={onConfirm}>
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplaceCartModal;