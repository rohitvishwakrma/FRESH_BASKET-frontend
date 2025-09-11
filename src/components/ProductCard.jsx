
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
        className="border border-gray-500/20 rounded-md px-2 sm:px-3 md:px-4 py-2 bg-white 
                   min-w-[160px] max-w-[180px] sm:min-w-[210px] sm:max-w-[220px] w-full"
      >
        {/* IMAGE */}
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition h-[100px] sm:h-[150px] md:h-[150px] w-auto object-contain"
            src={`http://localhost:5000/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="text-gray-500/60 text-xs sm:text-sm">
          <p className="truncate">{product.category}</p>
          <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
            {product.name}
          </p>

          {/* RATING */}
          <div className="flex flex-row items-center gap-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-2.5 sm:w-3 md:w-3.5"
                />
              ))}
            <p className="text-xs sm:text-sm">(4)</p>
          </div>

          {/* PRICE + CART */}
          <div className="flex items-end justify-between mt-2 sm:mt-3">
            <p className="text-indigo-500 text-sm sm:text-base md:text-xl font-medium flex items-center gap-1">
              <i className="ri-money-rupee-circle-fill"></i>
              {product.offerPrice}
              <span className="text-gray-500/60 text-[10px] sm:text-xs md:text-sm line-through ml-1">
                <i className="ri-money-rupee-circle-fill"></i>
                {product.price}
              </span>
            </p>

            {/* CART BUTTON */}
            <div onClick={(e) => e.stopPropagation()} className="text-indigo-500">
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 
                             w-[60px] sm:w-[70px] md:w-[80px] h-[30px] sm:h-[34px] rounded 
                             text-[12px] sm:text-sm text-indigo-600 font-medium cursor-pointer"
                >
                  <img src={assets.cart_icon} alt="cart icon" className="w-3 sm:w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2 w-[58px] sm:w-[70px] md:w-20 
                                h-[30px] sm:h-[34px] bg-indigo-500/25 rounded select-none text-[12px] sm:text-sm">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="cursor-pointer px-1 sm:px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-4 sm:w-5 text-center">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="cursor-pointer px-1 sm:px-2 h-full"
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