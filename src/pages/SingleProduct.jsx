import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


const SingleProduct = () => {
  // State for product details and quantity
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // App context: cart management, navigation, axios instance
  const { setCartItems, cartItems, navigate, axios } = useAppContext();

  // Get product ID or name from route params
  const { id } = useParams(); // id can be either product ID or name

  useEffect(() => {
    async function fetchProduct() {
      try {
        let data;
        // If id is a valid MongoDB ObjectId, fetch by ID
        if (/^[a-fA-F0-9]{24}$/.test(id)) {
          ({ data } = await axios.get(`/api/product/${id}`));
        } else {
          // Otherwise, fetch by name
          ({ data } = await axios.get(`/api/product/name/${encodeURIComponent(id)}`));
        }
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          toast.error(data.message || "Product not found");
        }
      } catch (error) {
        // If error is 404, show a specific message
        if (error.response && error.response.status === 404) {
          toast.error("Product not found. Please check the ID or name.");
        } else {
          console.error("Product fetch error:", error);
          toast.error(error.message || "Failed to fetch product");
        }
      }
    }
    fetchProduct();
  }, [id, axios]);

  const handleAddToCart = () => {
    if (!product) return;
    setCartItems({
      ...cartItems,
      [product._id]: quantity,
    });
    toast.success(`${quantity} x ${product.name} added to cart!`);
    if (typeof navigate === "function") {
      navigate("/cart");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src={Array.isArray(product.image) && product.image[0] ? `http://localhost:5000/images/${product.image[0]}` : "https://via.placeholder.com/256?text=No+Image"}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-lg border border-gray-50 bg-gray-50"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-lg font-semibold text-indigo-600 mb-4">₹{product.offerPrice}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-2">Weight: {product.weight}</p>
            <p className="text-gray-500 mb-2">In Stock: {product.stock}</p>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <label className="font-medium">Qty:</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
              className="border rounded px-3 py-2 w-20 text-center"
            />
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
