
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import "remixicon/fonts/remixicon.css";
import "remixicon/fonts/remixicon.css";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user, setCartItems } = useContext(AppContext);
  const [reorderQuantities, setReorderQuantities] = useState({});
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user", {
        withCredentials: true,
      });
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleReorderQtyChange = (orderId, productId, qty) => {
    setReorderQuantities((prev) => ({
      ...prev,
      [orderId]: {
        ...(prev[orderId] || {}),
        [productId]: qty,
      },
    }));
  };

  const reorderItems = (order) => {
    let newCart = {};
    order.items.forEach((item) => {
      const customQty =
        reorderQuantities[order._id]?.[item.product._id] || item.quantity;
      newCart[item.product._id] = Number(customQty);
    });
    setCartItems(newCart);
    toast.success("Items from selected order added to cart");
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logo and title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-700">My Orders</h1>
            <p className="mt-2 text-sm text-gray-600">
              Your Fresh Basket Item's order history
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary mr-2">Fresh Basket</span>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <i className="ri-play-fill text-white text-xl transform rotate-90"></i>
            </div>
          </div>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shopping-bag-line text-red-600 text-3xl"></i>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your order history will appear here once you start ordering.
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ">
              Order Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.map((order, idx) => (
              <div
                key={order._id || idx}
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
              >
                {/* Order header - always visible */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-800 font-medium">
                            #{idx + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order from {order.Shop?.name || "Fresh Basket"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Date not available"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col items-end">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Delivered"}
                      </span>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        Total: ₹{order.amount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                    <button
                      onClick={() => toggleOrderExpansion(order._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      {expandedOrder === order._id ? "Hide details" : "View details"}
                      <i className={`ri-arrow-${expandedOrder === order._id ? 'up' : 'down'}-s-line ml-1`}></i>
                    </button>
                  </div>
                </div>

                {/* Order details - expandable */}
                {expandedOrder === order._id && (
                  <div className="px-4 py-5 sm:p-6">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Order Items
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, i) => {
                        const currentQty =
                          reorderQuantities[order._id]?.[item.product._id] ||
                          item.quantity;

                        return (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row items-start justify-between py-3 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <img
                                src={
                                  typeof item.product.image === "string" &&
                                  item.product.image.startsWith("http")
                                    ? item.product.image
                                    : Array.isArray(item.product.image) &&
                                      item.product.image[0]
                                    ? `http://localhost:5000/images/${item.product.image[0]}`
                                    : "https://via.placeholder.com/80x80/f8f9fa/6c757d?text=Food"
                                }
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-lg  bg-gray-50 border border-white flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {item.product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.product.category}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Quantity: {item.quantity} • ₹
                                  {item.product.offerPrice} each
                                </div>
                                <div className="text-sm font-medium text-gray-900 mt-1">
                                  ₹{item.product.offerPrice * item.quantity}
                                </div>
                              </div>
                            </div>
                                  {/* qty upgrade button */}
                            <div className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                  <button
                                    onClick={() => {
                                      const newQty = Math.max(1, currentQty - 1);
                                      handleReorderQtyChange(
                                        order._id,
                                        item.product._id,
                                        newQty
                                      );
                                    }}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-1 bg-white w-12 text-center">
                                    {currentQty}
                                  </span>
                                  <button
                                    onClick={() => {
                                      const newQty = currentQty + 1;
                                      handleReorderQtyChange(
                                        order._id,
                                        item.product._id,
                                        newQty
                                      );
                                    }}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    setCartItems((prev) => ({
                                      ...prev,
                                      [item.product._id]: Number(currentQty),
                                    }));
                                    toast.success(
                                      `${item.product.name} added to cart`
                                    );
                                  }}
                                  className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-xs whitespace-nowrap"
                                >
                                  Reorder
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => reorderItems(order)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm font-medium flex items-center"
                      >
                       <i className="ri-shopping-basket-fill mr-2"></i>
                        Reorder All Items
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
     
    </div>
  );
};

export default MyOrders;

// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const MyOrders = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const { axios, user } = useContext(AppContext);
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/order/user");
//       if (data.success) {
//         setMyOrders(data.orders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchOrders();
//     }
//   }, [user]);
//   // Swiggy-style reorder features
//   const [reorderQuantities, setReorderQuantities] = useState({});
//   const { setCartItems } = useContext(AppContext);

//   const handleReorderQtyChange = (orderId, productId, qty) => {
//     setReorderQuantities((prev) => ({
//       ...prev,
//       [orderId]: {
//         ...(prev[orderId] || {}),
//         [productId]: qty,
//       },
//     }));
//   };

//   const reorderItems = (order) => {
//     let newCart = {};
//     order.items.forEach((item) => {
//       const customQty = reorderQuantities[order._id]?.[item.product._id];
//       newCart[item.product._id] = customQty ? Number(customQty) : item.quantity;
//     });
//     setCartItems(newCart);
//     toast.success("Items from selected order added to cart");
//   };

//   return (
//     <div className="mt-12 pb-16">
//       <div>
//         <p className="text-2xl md:text-3xl font-medium">My Orders</p>
//       </div>

//       {myOrders.map((order, idx) => (
//         <div
//           key={order._id || idx}
//           className="my-8 border border-gray-300 rounded-xl mb-10 p-4 py-5 max-w-4xl shadow flex flex-col gap-4"
//         >
//           {/* Order summary */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
//             <div>
//               <span className="font-bold text-lg text-gray-800">Order #{idx + 1}</span>
//               {order.createdAt && (
//                 <span className="ml-3 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
//               )}
//             </div>
//             <div className="text-gray-600 text-sm">{order.items.length} items</div>
//             <div className="text-gray-600 text-sm">Total: ${order.amount}</div>
//           </div>
//           {/* Items list */}
//           <div className="divide-y divide-gray-100">
//             {order.items.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between py-3"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={
//                       typeof item.product.image === 'string' && item.product.image.startsWith('http')
//                         ? item.product.image
//                         : Array.isArray(item.product.image) && item.product.image[0]
//                           ? `http://localhost:5000/images/${item.product.image[0]}`
//                           : 'https://via.placeholder.com/56?text=No+Image'
//                     }
//                     alt={item.product.name}
//                     title={typeof item.product.image === 'string' ? item.product.image : 'No image URL'}
//                     className="w-14 h-14 object-cover rounded border bg-gray-100"
//                   />
//                   <div>
//                     <div className="font-medium text-gray-700">{item.product.name}</div>
//                     <div className="text-xs text-gray-400">{item.product.category}</div>
//                     <div className="text-xs text-gray-400">Last ordered: {item.quantity}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <select
//                     value={
//                       reorderQuantities[order._id]?.[item.product._id] ?? item.quantity
//                     }
//                     onChange={(e) =>
//                       handleReorderQtyChange(order._id, item.product._id, e.target.value)
//                     }
//                     className="border rounded px-2 py-1 text-sm outline-none"
//                   >
//                     {Array(10)
//                       .fill("")
//                       .map((_, q) => (
//                         <option key={q + 1} value={q + 1}>
//                           {q + 1}
//                         </option>
//                       ))}
//                   </select>
//                   <button
//                     onClick={() => {
//                       const qty = reorderQuantities[order._id]?.[item.product._id] || item.quantity;
//                       setCartItems((prev) => ({
//                         ...prev,
//                         [item.product._id]: Number(qty),
//                       }));
//                       toast.success(`${item.product.name} added to cart`);
//                     }}
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-xs"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//                 <div className="ml-4 text-xs text-gray-500">Amount: ${item.product.offerPrice * item.quantity}</div>
//               </div>
//             ))}
//           </div>
//           {/* Bulk reorder button */}
//           <button
//             onClick={() => reorderItems(order)}
//             className="self-end mt-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
//           >
//             Reorder All
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default MyOrders;
