import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import "remixicon/fonts/remixicon.css";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
          scrollTo(0, 0);
        }}
        className="flex flex-col border border-gray-200 rounded-lg shadow-sm p-2 
                   w-full bg-white hover:shadow-md transition cursor-pointer"
      >
        {/* IMAGE */}
        <div className="group flex items-center justify-center 
                        h-28 sm:h-32 md:h-36">
          <img
            className="group-hover:scale-105 transition-transform duration-300 object-contain max-h-full max-w-full"
            src={`http://localhost:5000/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className=" flex flex-col flex-grow">
          {/* Category */}
          <p className="truncate text-[10px] sm:text-xs text-gray-500 capitalize">
            {product.category}
          </p>

          {/* Name */}
          <p className="truncate text-xs sm:text-sm md:text-base font-semibold text-gray-800">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-2.5 sm:w-3"
                />
              ))}
            <span className="text-[10px] sm:text-xs text-gray-500">(4)</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-auto pt-1">
            {/* PRICE */}
            <p className="text-indigo-600 font-semibold text-xs sm:text-sm md:text-base flex items-center gap-1">
              <i className="ri-money-rupee-circle-fill text-indigo-600"></i>{product.offerPrice}
              <span className="line-through text-gray-400 text-[9px] sm:text-xs">
                <i className="ri-money-rupee-circle-fill text-indigo-600"></i>{product.price}
              </span>
            </p>

            {/* CART BUTTON */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-indigo-500 flex-shrink-0"
            >
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center justify-center gap-1 px-1.5 py-0.5 
                             bg-indigo-50 border border-indigo-200 rounded-md
                             text-[10px] sm:text-xs font-medium text-indigo-600"
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart icon"
                    className="w-3 sm:w-3.5"
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-1 px-2 
                                bg-indigo-500/10 rounded-md 
                                text-[10px] sm:text-xs h-6 sm:h-7">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="px-1 font-bold"
                  >
                    -
                  </button>
                  <span className="w-3 text-center">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="px-1 font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
 

// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import 'remixicon/fonts/remixicon.css';

// const ProductCard = ({ product }) => {
//   const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();
//   return (
//     product && (
//       <div
//         onClick={() => {
//           navigate(
//             `/product/${product.category.toLowerCase()}/${product?._id}`
//           );
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
//       >
//         <div className="group cursor-pointer flex items-center justify-center px-2">
//           <img
//             className="group-hover:scale-105 transition max-w-26 md:max-w-36"
//             src={`http://localhost:5000/images/${product.image[0]}`}
//             alt={product.name}
//           />
//         </div>
//         <div className="text-gray-500/60 text-sm">
//           <p>{product.category}</p>
//           <p className="text-gray-700 font-medium text-lg truncate w-full">
//             {product.name}
//           </p>
//           <div className="flex items-center gap-0.5">
//             {Array(5)
//               .fill("")
//               .map((_, i) => (
//                 <img
//                   key={i}
//                   src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                   alt="rating"
//                   className="w-3 md:w-3.5"
//                 />
//               ))}
//             <p>(4)</p>
//           </div>
//           <div className="flex items-end justify-between mt-3">
//             <p className="md:text-xl text-base font-medium text-indigo-500">
//             <i className="ri-money-rupee-circle-fill"></i>{product.offerPrice}{" "}
//               <span className="text-gray-500/60 md:text-sm text-xs line-through">
//               <i className="ri-money-rupee-circle-fill"></i>{product.price}
//               </span>
//             </p>
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="text-indigo-500"
//             >
//               {!cartItems?.[product?._id] ? (
//                 <button
//                   onClick={() => addToCart(product?._id)}
//                   className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
//                 >
//                   <img src={assets.cart_icon} alt="cart icon" />
//                   Add
//                 </button>
//               ) : (
//                 <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
//                   <button
//                     onClick={() => removeFromCart(product?._id)}
//                     className="cursor-pointer text-md px-2 h-full"
//                   >
//                     -
//                   </button>
//                   <span className="w-5 text-center">
//                     {cartItems[product?._id]}
//                   </span>
//                   <button
//                     onClick={() => addToCart(product?._id)}
//                     className="cursor-pointer text-md px-2 h-full"
//                   >
//                     +
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };
// export default ProductCard;