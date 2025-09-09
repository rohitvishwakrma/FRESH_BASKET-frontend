import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";

const ProductExpiryModal = ({ products, onConfirm, onClose }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleConfirm = async () => {
    try {
      await onConfirm(selected);
      toast.success("Selected products marked for destruction.");
      onClose();
    } catch (err) {
      toast.error("Error updating products.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-red-600">Mark Expired Products</h2>
        <p className="mb-2 text-gray-700">Select products to destroy or store:</p>
        <div className="max-h-64 overflow-y-auto mb-4">
          {products.length === 0 ? (
            <p className="text-gray-500">No expiring products found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product._id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <span className="ml-2 text-xs text-gray-500">Expiry: {new Date(product.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selected.includes(product._id)}
                    onChange={() => handleSelect(product._id)}
                    className="accent-red-600 w-5 h-5"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700">Cancel</button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded bg-red-600 text-white font-semibold" disabled={selected.length === 0}>Confirm Destroy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductExpiryModal;
