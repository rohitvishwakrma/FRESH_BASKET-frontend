// import React, { useState } from "react";

// export default function CreatePartner() {
//   const [formData, setFormData] = useState({
//     businessName: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//     message: "",
//     document: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");
//     try {
//       const form = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) form.append(key, value);
//       });
//       const res = await fetch("/api/partners/apply", {
//         method: "POST",
//         body: form,
//       });
//       if (res.ok) {
//         setSuccess("Partner application created successfully!");
//         setFormData({
//           businessName: "",
//           contactPerson: "",
//           email: "",
//           phone: "",
//           message: "",
//           document: null,
//         });
//       } else {
//         setError("Failed to create partner application.");
//       }
//     } catch (err) {
//       setError("Failed to create partner application.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto py-10 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Create Partner Application</h2>
//       {success && <p className="text-green-600 mb-4">{success}</p>}
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Business Name</label>
//           <input
//             type="text"
//             name="businessName"
//             value={formData.businessName}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Contact Person</label>
//           <input
//             type="text"
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Message</label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows={3}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Upload Document (optional)</label>
//           <input
//             type="file"
//             name="document"
//             onChange={handleChange}
//             className="w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
//         >
//           {loading ? "Submitting..." : "Create Application"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Upload, Building, User, Mail, Phone, MessageCircle, Loader } from "lucide-react";

export default function CreatePartner() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
    document: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
      setFileName(files[0] ? files[0].name : "");
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        setSuccess("Partner application submitted successfully!");
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          message: "",
          document: null,
        });
        setFileName("");
      } else {
        setError("Failed to create partner application. Please try again.");
      }
    } catch (err) {
      setError("Failed to create partner application. Please check your connection and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
            <h1 className="text-3xl font-bold text-center">Become a Partner</h1>
            <p className="text-green-100 text-center mt-2">
              Join our network of trusted partners and grow your business
            </p>
          </div>
          
          <div className="p-8">
            {/* Status Messages */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {success}
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-green-600" />
                    Business Name
                  </div>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Enter your business name"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    Contact Person
                  </div>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Full name of contact person"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-green-600" />
                      Email Address
                    </div>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      Phone Number
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                    Message
                  </div>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Tell us about your business and why you want to partner with us"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <Upload className="w-4 h-4 mr-2 text-green-600" />
                    Business Document (Optional)
                  </div>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="document"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="document"
                          name="document"
                          type="file"
                          onChange={handleChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                    {fileName && (
                      <p className="text-sm text-green-600 font-medium mt-2">
                        {fileName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin w-5 h-5 mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our terms and privacy policy.
              We'll contact you within 2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components for icons
const CheckCircle = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const XCircle = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);