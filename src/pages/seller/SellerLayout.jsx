import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const SellerLayout = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();
  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };
  return (
    <>
  <div className="flex items-center justify-between px-8 md:px-20 border-b border-gray-200 py-6 bg-gray-50 shadow-lg transition-all duration-300">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold text-green-700 tracking-wide drop-shadow">Seller Dashboard</h1>
        </Link>
        <div className="flex items-center gap-8 text-gray-700">
          <p className="text-lg font-medium">Hi, Seller!</p>
          <button
            onClick={logout}
            className="border-2 border-green-600 rounded-full text-base px-6 py-2 font-semibold bg-green-600 hover:bg-green-700 text-white shadow transition-all"
          >
            Logout
          </button>
        </div>
      </div>
  <div className="flex min-h-screen w-full bg-gray-50">
        <div className="md:w-80 w-20 border-r h-full text-lg border-gray-200 pt-8 flex flex-col bg-white shadow-lg">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-4 px-6 gap-4 rounded-lg mx-2 my-2 transition-all duration-200
                            ${
                              isActive
                                ? "bg-green-100 text-green-700 font-bold shadow border-l-4 border-green-600"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
            >
              <img src={item.icon} alt="" className="w-8 h-8" />
              <span className="md:block hidden text-center">{item.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="flex-1 bg-gray-50 p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default SellerLayout;
