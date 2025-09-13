import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  return (
    <div className="mt-10 w-full bg-white border border-gray-100 px-4 py-10 rounded-xl shadow">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-3xl md:text-4xl font-medium text-green-600 " >
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}     
      {filteredProducts.length > 0 ? (
        <div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 bg-gray-50 border border-gray-100 px-4 rounded-sm shadow">
          <h1 className="text-3xl md:text-4xl font-medium text-red-600 text-centeq">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
};
export default ProductCategory;
