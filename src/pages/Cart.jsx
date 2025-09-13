
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import "remixicon/fonts/remixicon.css";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  useEffect(() => {
    if (user) {
      axios.get("/api/address/get").then(({ data }) => {
        if (data.success) {
          setAddress(data.addresses);
          if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
        } else {
          toast.error(data.message);
        }
      }).catch((error) => toast.error(error.message));
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const tempArray = [];
      for (const key in cartItems) {
        const product = products.find((product) => product._id === key);
        if (product) {
          product.quantity = cartItems[key];
          tempArray.push(product);
        }
      }
      setCartArray(tempArray);
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      if (typeof navigate === "function") {
        navigate("/my-orders");
      }
    }
  }, [cartItems, navigate]);
/* place order logic */
  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            expiryDate: item.expiryDate,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          // Redirect to single order page after payment
          if (data.order && data.order._id) {
            navigate(`/order/${data.order._id}`);
          } else {
            navigate("/my-orders");
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

/* rozarpay logic */

const razorpayPayment = async () => {
  try {
    const amount = totalCartAmount(); // Use actual cart amount only

    // Step 1: create order in backend
    const { data } = await axios.post("/api/payment/order", { amount });

    // Backend returns: { success, msg, order_id, amount, key_id, ... }
    if (!data.success || !data.order_id) {
      const backendMessage = data?.msg || (typeof data === 'object' ? JSON.stringify(data) : data);
      console.error("Order creation failed:", backendMessage);
      return toast.error("Order creation failed: " + backendMessage);
    }

    // Step 2: open Razorpay
    const options = {
      key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "FreshBasket",
      description: "Order Payment",
      order_id: data.order_id,
      handler: async (response) => {
        // Step 3: verify payment
        const verifyRes = await axios.post("/api/payment/verify", response);
        if (verifyRes.data.success) {
          toast.success("Payment Successful 🎉");
          placeOrder(); // save order in DB
        } else {
          toast.error("Payment verification failed..");
        }
      },
      prefill: {
        name: user?.name || " ",
        email: user?.email || "",
        contact : user?.phone || " ",
      },
      theme: { color: "#4F46E5" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error(error.message);
  }
};

  if (!cartItems || Object.keys(cartItems).length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-8 bg-gray-50">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <i className="ri-shopping-cart-line text-green-600"></i> Shopping Cart
          <span className="text-sm text-indigo-500">{cartCount()} Items</span>
        </h1>
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium pb-3 border-b">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>
        {cartArray.map((product, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b hover:bg-gray-50 transition">
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`product/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border-white  rounded-lg overflow-hidden bg-gray-50"
              >
                <img
                  className="max-w-full h-full object-contain bg-white"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.image[0]}`}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-500 text-sm">Weight: <span>{product.weight || "N/A"}</span></p>
                <div className="flex items-center mt-1 text-sm">
                  <p className="mr-2">Qty:</p>
                  <select
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                    value={cartItems[product._id]}
                    className="border rounded px-2 py-1 text-sm outline-none"
                  >
                    {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                      .fill("")
                      .map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-center font-medium text-gray-700">
              <i className="ri-money-rupee-circle-fill text-indigo-600"></i>
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto text-red-500 hover:text-red-600 transition"
              title="Remove from cart"
            >
              <i className="ri-close-circle-line text-xl"></i>
            </button>
          </div>
        ))}
        <button
          onClick={() => navigate("/products")}
          className="max-w-fit bg-green-600 hover:bg-green-700 border rounded-3xl max-h-fit px-10 py-2 group cursor-pointer flex items-center mt-8 gap-4 text-gray-50 font-medium"
        >
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <hr className="border-gray-300 mb-4" />
        <p className="text-sm font-medium uppercase">Delivery Address</p>
        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-600 text-sm">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No Address Found"}
          </p>
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-500 hover:underline text-sm"
          >
            Change
          </button>
          {showAddress && (
            <div className="absolute top-12 py-1 bg-white border border-gray-300 rounded shadow text-sm w-full z-10">
              {address.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {address.street}, {address.city}, {address.state}, {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-50"
              >
                <i className="ri-add-circle-line"></i> Add address
              </p>
            </div>
          )}
        </div>
        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
        <hr className="border-gray-300 my-4" />
        <div className="text-gray-700 text-sm space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span><i className="ri-money-rupee-circle-fill text-indigo-600"></i>{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span><i className="ri-money-rupee-circle-fill text-indigo-600"></i>{(totalCartAmount() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-base font-semibold mt-3">
            <span>Total Amount</span>
            <span><i className="ri-money-rupee-circle-fill text-indigo-600"></i>{totalCartAmount() + (totalCartAmount() * 2) / 100}</span>
          </p>
        </div>
        {/*  payment option btn */}
        {/* <button
          onClick={() => {
            if (!user) {
              toast.error("Please login to continue");
              setShowUserLogin(true);
            } else {
              placeOrder();
            }
          }}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition rounded-lg"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button> */}
        <button
  onClick={() => {
    if (!user) {
      toast.error("Please login to continue");
      setShowUserLogin(true);
    } else {
      if (paymentOption === "COD") {
        placeOrder();
      } else {
        razorpayPayment(); // 🔥 Razorpay flow
      }
    }
  }}
  className="w-full py-3 mt-6 cursor-pointer bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition rounded-lg"
>
  {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
</button>

      </div>
    </div>
  );
};

export default Cart;



// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import "remixicon/fonts/remixicon.css";

// const loadScript = (src) => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const Cart = () => {
//   const {
//     products,
//     navigate,
//     cartCount,
//     totalCartAmount,
//     cartItems,
//     setCartItems,
//     removeFromCart,
//     updateCartItem,
//     axios,
//     user,
//     setShowUserLogin,
//   } = useAppContext();

//   const [cartArray, setCartArray] = useState([]);
//   const [address, setAddress] = useState([]);
//   const [showAddress, setShowAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentOption, setPaymentOption] = useState("COD");

//   const getCart = () => {
//     let tempArray = [];
//     for (const key in cartItems) {
//       const product = products.find((product) => product._id === key);
//       product.quantity = cartItems[key];
//       tempArray.push(product);
//     }
//     setCartArray(tempArray);
//   };

//   const getAddress = async () => {
//     try {
//       const { data } = await axios.get("/api/address/get");
//       if (data.success) {
//         setAddress(data.addresses);
//         if (data.addresses.length > 0) {
//           setSelectedAddress(data.addresses[0]);
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (user) getAddress();
//   }, [user]);

//   useEffect(() => {
//     if (products.length > 0 && cartItems) getCart();
//   }, [products, cartItems]);

//   const placeOrder = async () => {
//     try {
//       if (!selectedAddress) return toast.error("Please select an address");

//       if (paymentOption === "COD") {
//         const { data } = await axios.post("/api/order/cod", {
//           items: cartArray.map((item) => ({
//             product: item._id,
//             quantity: item.quantity,
//             expiryDate: item.expiryDate,
//           })),
//           address: selectedAddress._id,
//         });
//         if (data.success) {
//           toast.success(data.message);
//           setCartItems({});
//           navigate("/my-orders");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return products.length > 0 && cartItems ? (
//     <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-8  bg-gray-50">
//       {/* Cart Section */}
//       <div className="flex-1 max-w-4xl">
//         <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
//           🛒 Shopping Cart
//           <span className="text-sm text-indigo-500">
//             {cartCount()} Items
//           </span>
//         </h1>

//         <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium pb-3 border-b">
//           <p className="text-left">Product Details</p>
//           <p className="text-center">Subtotal</p>
//           <p className="text-center">Action</p>
//         </div>

//         {cartArray.map((product, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b hover:bg-gray-50 transition"
//           >
//             {/* Product Info */}
//             <div className="flex items-center md:gap-6 gap-3">
//               <div
//                 onClick={() => {
//                   navigate(`product/${product.category}/${product._id}`);
//                   scrollTo(0, 0);
//                 }}
//                 className="cursor-pointer w-24 h-24 flex items-center justify-center border rounded-lg overflow-hidden bg-gray-50"
//               >
//                 <img
//                   className="max-w-full h-full object-contain"
//                   src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.image[0]}`}
//                   alt={product.name}
//                 />
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">{product.name}</p>
//                 <p className="text-gray-500 text-sm">
//                   Weight: <span>{product.weight || "N/A"}</span>
//                 </p>
//                 <div className="flex items-center mt-1 text-sm">
//                   <p className="mr-2">Qty:</p>
//                   <select
//                     onChange={(e) =>
//                       updateCartItem(product._id, Number(e.target.value))
//                     }
//                     value={cartItems[product._id]}
//                     className="border rounded px-2 py-1 text-sm outline-none"
//                   >
//                     {Array(
//                       cartItems[product._id] > 9 ? cartItems[product._id] : 9
//                     )
//                       .fill("")
//                       .map((_, index) => (
//                         <option key={index} value={index + 1}>
//                           {index + 1}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Subtotal */}
//             <p className="text-center font-medium text-gray-700">
//               <i className="ri-money-rupee-circle-fill text-indigo-600"></i>
//               {product.offerPrice * product.quantity}
//             </p>

//             {/* Remove Button */}
//             <button
//               onClick={() => removeFromCart(product._id)}
//               className="mx-auto text-red-500 hover:text-red-600 transition"
//               title="Remove from cart"
//             >
//               <i className="ri-close-circle-line text-xl"></i>
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={() => navigate("/products")}
//           className="max-w-fit bg-green-700 border rounded-3xl max-h-fit px-10 py-2 group cursor-pointer flex items-center mt-8 gap-4 text-gray-50 font-medium"
//         >
//           Continue Shopping
//         </button>
//       </div>

//       {/* Order Summary */}
//       <div className="max-w-[360px] w-full bg-gray-50 p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//         <hr className="border-gray-300 mb-4" />

//         {/* Address */}
//         <p className="text-sm font-medium uppercase">Delivery Address</p>
//         <div className="relative flex justify-between items-start mt-2">
//           <p className="text-gray-600 text-sm">
//             {selectedAddress
//               ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
//               : "No Address Found"}
//           </p>
//           <button
//             onClick={() => setShowAddress(!showAddress)}
//             className="text-indigo-500 hover:underline text-sm"
//           >
//             Change
//           </button>
//           {showAddress && (
//             <div className="absolute top-12 py-1 bg-white border border-gray-300 rounded shadow text-sm w-full z-10">
//               {address.map((address, index) => (
//                 <p
//                   key={index}
//                   onClick={() => {
//                     setSelectedAddress(address);
//                     setShowAddress(false);
//                   }}
//                   className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   {address.street}, {address.city}, {address.state},{" "}
//                   {address.country}
//                 </p>
//               ))}
//               <p
//                 onClick={() => navigate("/add-address")}
//                 className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-50"
//               >
//                 <i className="ri-add-circle-line"></i> Add address
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Payment */}
//         <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
//         <select
//           onChange={(e) => setPaymentOption(e.target.value)}
//           className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded outline-none"
//         >
//           <option value="COD">Cash On Delivery</option>
//           <option value="Online">Online Payment</option>
//         </select>

//         <hr className="border-gray-300 my-4" />

//         {/* Price Details */}
//         <div className="text-gray-700 text-sm space-y-2">
//           <p className="flex justify-between">
//             <span>Price</span>
//             <span>
//               <i className="ri-money-rupee-circle-fill text-indigo-600"></i>
//               {totalCartAmount()}
//             </span>
//           </p>
//           <p className="flex justify-between">
//             <span>Shipping Fee</span>
//             <span className="text-green-600">Free</span>
//           </p>
//           <p className="flex justify-between">
//             <span>Tax (2%)</span>
//             <span>
//               <i className="ri-money-rupee-circle-fill text-indigo-600"></i>
//               {(totalCartAmount() * 2) / 100}
//             </span>
//           </p>
//           <p className="flex justify-between text-base font-semibold mt-3">
//             <span>Total Amount</span>
//             <span>
//               <i className="ri-money-rupee-circle-fill text-indigo-600"></i>
//               {totalCartAmount() + (totalCartAmount() * 2) / 100}
//             </span>
//           </p>
//         </div>

//         {/* Place Order */}
//       <button
//           onClick={() => {
//         if (!user) {
//            toast.error("Please login to continue");
//            setShowUserLogin(true); // open login modal
//           } else {
//       placeOrder(); // proceed with order
//     }
//   }}
//   className="w-full py-3 mt-6 cursor-pointer bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition rounded-lg"
// >
//   {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
// </button>

//       </div>
//     </div>
//   ) : null;
// };

// export default Cart;

