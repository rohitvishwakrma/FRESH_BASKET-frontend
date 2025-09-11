// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import  {useAppContext } from "../context/AppContext";  //.. contxt
// const BestSeller = () => {
//   const { products } = useAppContext();
//   return (
//     <div className="mt-16 w-full bg-gray-50 py-10 px-2 md:px-8 rounded-xl shadow">
//       <p className="text-3xl md:text-4xl font-bold text-green-700 mb-8">Best Sellers</p>
//       <div className="my-6 grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 items-center justify-center">
//         {products
//           .filter((product) => product.inStock)
//           .slice(0, 100)
//           .map((product, index) => (
//            <ProductCard key={index}
//            className="max-w-24  group cursor-pointer py-6 p-4 rounded-xl gap-10 flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg transition-all border border-gray-100" 
//             product={product} 
//             />
            
//           ))}
//       </div>
//     </div>
//   );
// };
// export default BestSeller;
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16 w-full bg-gray-50 py-10 px-2 md:px-8  border-0 rounded-xl shadow">
      <p className="text-3xl md:text-4xl font-bold text-green-700 mb-8">Best Sellers</p>
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 items-center justify-center">
        {products
          .filter((product) => product.inStock)
          .slice(0, 20) // keep your limit
          .map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer  rounded-xl flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="max-w-full flex object-cover items-center  justify-center  bg-white shadow-md ">
                {/* ProductCard renders inside, but image stays contained */}
                <ProductCard product={product} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
