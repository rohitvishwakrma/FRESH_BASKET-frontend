import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/appContext";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";


import About from "./companyPages/About";
import Career from "./companyPages/CareerPage";
import Blog from "./companyPages/Blog";
import Partners from "./companyPages/Partners";
import Article from "./companyPages/Article"; 

import ContactUs from "./supportPages/ContactUs";
import  CustomerHelp  from "./supportPages/HelpCenter";
import FAQsPage from "./supportPages/Faqs";
import Accessibility from "./supportPages/Acessbilty";
import LiveChat from "./supportPages/LiveChat";

import QuickSeasonalRecipes from "./companyPages/QuickSeasonalRecipes";
import StoreVegetables from "./companyPages/StoreVegetables";
import ApplyForm from "./companyPages/ApplyForm";
import CareerPage from "./companyPages/CareerPage";
import PartnerApply from "./companyPages/PartnerApply";
import PartnerAdminDashboard from "./companyPages/PartnerAdminDashboard";

import PartnerLogin from "./companyPages/PartnerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorBoundary from "./utils/ErrorBoundary";


import TermsPolicy from "./termsPolicy/TermsPolicy";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  const location=useLocation();
  
  // hidden path
  const hideFooterPaths=["/About","/Careers","/Blog","/Partners","/Article  "];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  useEffect(() => {
    if (shouldHideFooter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shouldHideFooter]);
  return (
    <ErrorBoundary>
      <div className="text-default min-h-screen">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Auth /> : null}
        <Toaster />
        <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/product/:category/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/add-address" element={<Address />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/About" element={<About />} />
            <Route path="/Careers" element={<Career />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Partners" element={<Partners />} />
            <Route path="/Article" element={<Article />} />   
            <Route path="/Terms&Policy" element={<TermsPolicy />} />


            <Route path="/Contactus" element={<ContactUs />} />
            <Route path="/Help-center" element={<CustomerHelp/>} />
            <Route path="/Faqs" element={<FAQsPage/>} />
            <Route path="/access-ability" element={<Accessibility/>} />
            <Route path="/live-chat" element={<LiveChat/>} />
            

            <Route path="/quick-seasonal-recipes" element={<QuickSeasonalRecipes />} />
            <Route path="/store-vegetables" element={<StoreVegetables />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/partner-apply" element={<PartnerApply />} />
            <Route path="/admin/partners" element={<PartnerAdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/partner-login" element={<PartnerLogin />} />
            {/* Seller routes */}
            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="product-list" element={isSeller ? <ProductList /> : null} />
              <Route path="orders" element={isSeller ? <Orders /> : null} />
            </Route>
          </Routes>
        </div>
        {isSellerPath ? null : <Footer />}
      </div>
    </ErrorBoundary>
  );
};
export default App;
