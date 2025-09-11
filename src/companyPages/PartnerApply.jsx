// src/pages/PartnerApply.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PartnerApply() {
  const businessOptions = [
    "FreshFarm Grocers",
    "GreenLeaf Farms",
    "QuickDeliver Logistics",
    "Urban Organic Market",
    "Other"
  ];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
    password: "",
    document: null,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const form = new FormData();
      form.append("businessName", formData.businessName);
      form.append("contactPerson", formData.contactPerson);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("message", formData.message);
      form.append("password", formData.password);
      if (formData.document) {
        form.append("document", formData.document);
      }
      const res = await fetch("http://localhost:5000/api/partners/apply", {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        setSuccess("Your application has been submitted! Await admin approval.");
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          message: "",
          password: "",
          document: null,
        });
        setTimeout(() => navigate("/partners"), 2000);
      } else {
        setError("Failed to submit application.");
      }
    } catch (err) {
      setError("Failed to submit application.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-6 py-10"
    >
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-700">
          Apply to Partner with Fresh Basket
        </h1>
        <p className="mt-4 text-gray-700">
          Fill in the details below and we will review your application.
        </p>
      </header>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Business Name</label>
          <select
            name="businessName"
            value={formData.businessName || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a business</option>
            {businessOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contact Person 
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Document (optional)</label>
          <input
            type="file"
            name="document"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message || ""}
            onChange={handleChange}
            rows={4}
            placeholder="Write a brief introduction about your business..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </motion.div>
  );
}