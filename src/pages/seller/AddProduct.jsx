import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";
const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
  formData.append("name", name);
  formData.append("description", JSON.stringify([description]));
  formData.append("category", category);
  formData.append("price", price);
  formData.append("offerPrice", offerPrice);
  formData.append("expiryDate", expiryDate);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
  setFiles([]);
  setExpiryDate("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
  <div className="py-10 flex flex-col items-center justify-center min-h-screen bg-[#F3F8FF] w-full">
      <form onSubmit={handleSubmit} className="md:p-10 p-6 space-y-8 w-full rounded-2xl shadow-2xl border border-gray-100 bg-white">
        <div>
          <p className="text-lg font-semibold text-green-700 mb-2">Product Images</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
  <hr className="my-4 border-indigo-100" />
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                    <img
                      className="max-w-24 h-24 object-cover rounded-lg border-2 border-indigo-200 cursor-pointer shadow-sm hover:shadow-md transition"
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : assets.upload_area
                      }
                      alt="uploadArea"
                      width={100}
                      height={100}
                    />
                </label>
              ))}
          </div>
        </div>
  <div className="flex flex-col gap-1 max-w-md">
  <hr className="my-4 border-indigo-100" />
          <label className="text-base font-semibold text-gray-700" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>
  <div className="flex flex-col gap-1 max-w-md">
  <hr className="my-4 border-indigo-100" />
          <label className="text-base font-semibold text-gray-700" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
  <div className="w-full flex flex-col gap-1">
  <hr className="my-4 border-indigo-100" />
          <label className="text-base font-semibold text-gray-700" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option value={category.path} key={index}>
                {category.path}
              </option>
            ))}
          </select>
        </div>
  <div className="flex items-center gap-5 flex-wrap">
  <hr className="my-4 border-indigo-100" />
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-semibold text-gray-700" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-semibold text-gray-700" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>
        </div>
  <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-semibold text-gray-700" htmlFor="expiry-date">
            Expiry Date
          </label>
          <input
            id="expiry-date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="outline-none py-2 px-3 rounded border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>
        <button className="px-8 py-2.5 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
