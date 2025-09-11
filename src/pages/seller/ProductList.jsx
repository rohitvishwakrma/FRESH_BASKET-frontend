import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import React, { useState } from "react";
import ProductExpiryModal from "./ProductExpiryModal";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);

  // Fetch expiring products for notification
  React.useEffect(() => {
    const fetchExpiringSoon = async () => {
      try {
        const { data } = await axios.get("/api/product/expiring");
        setExpiringSoon(data.products || []);
      } catch (err) {
        // Silent fail
      }
    };
    fetchExpiringSoon();
  }, [axios]);

  const toggleStock = async (id, inStock) => {
    try {
      const stock = inStock ? 1 : 0;
      const { data } = await axios.patch("/api/product/stock", { productId: id, stock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch expiring products for modal
  const handleShowExpiryModal = async () => {
    try {
      const { data } = await axios.get("/api/product/expiring");
      setExpiringProducts(data.products || []);
      setShowExpiryModal(true);
    } catch (err) {
      toast.error("Failed to fetch expiring products.");
    }
  };

  // Confirm destruction/storage
  const handleConfirmExpiry = async (selectedIds) => {
    try {
      await axios.post("/api/product/destroy", { ids: selectedIds });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update products.");
    }
  };

  return (
  <div className="flex-1 py-10 flex flex-col justify-between min-h-screen">
      <div className="w-full md:p-10 p-4">
        <div>
          {expiringSoon.length > 0 && (
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
              <strong>Attention:</strong> You have {expiringSoon.length} product(s) expiring within 7 days. <button className="underline ml-2 text-yellow-900" onClick={handleShowExpiryModal}>Review Now</button>
            </div>
          )}
          <h2 className="pb-4 text-2xl font-bold text-green-700">All Products</h2>
          <button
            className="mb-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-lg transition-all"
            onClick={handleShowExpiryModal}
          >
            Mark Expired Products
          </button>
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">Expiry Date</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={`http://localhost:5000/images/${product.image[0]}`}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                  <td className="px-4 py-3">
                    {product.expiryDate ? (
                      <span className="font-semibold text-red-600">{new Date(product.expiryDate).toLocaleDateString()}</span>
                    ) : (
                      <span className="text-gray-400">No date</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showExpiryModal && (
        <ProductExpiryModal
          products={expiringProducts}
          onConfirm={handleConfirmExpiry}
          onClose={() => setShowExpiryModal(false)}
        />
      )}
    </div>
  );
};
export default ProductList;
