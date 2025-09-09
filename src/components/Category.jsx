import { categories } from "../assets/assets";
import { useAppContext } from "../context/appContext";
const Category = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16 w-full bg-gray-50 py-10 px-2 md:px-8 rounded-xl shadow">
      <p className="text-3xl md:text-4xl font-bold text-green-700 mb-8">Categories</p>
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 items-center justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-6 px-4 rounded-xl gap-3 flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg transition-all border border-gray-100"
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt=""
              className="max-w-24 transition group-hover:scale-110 drop-shadow"
            />
            <p className="text-base font-semibold text-gray-700 mt-2">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Category;
