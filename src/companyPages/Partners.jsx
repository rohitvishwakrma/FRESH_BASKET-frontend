// Partners.jsx - Displays all partners with status and details
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Partners() {
  // Navigation for apply button
  const navigate = useNavigate();
  // State for partners, loading, error
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all partners on mount
  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/partners/all");
        const data = await res.json();
        setPartners(data);
      } catch (err) {
        setError("Failed to load partners.");
      }
      setLoading(false);
    };
    fetchPartners();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gray-50 px-6 py-16"
    >
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-green-700">Our Trusted Partners</h1>
        <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
          We collaborate with top-notch partners to bring you the freshest produce, highest quality services, and most reliable delivery experiences.
        </p>
      </header>

      {/* Partner Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {loading ? (
          <p className="col-span-4 text-center">Loading partners...</p>
        ) : error ? (
          <p className="col-span-4 text-center text-red-600">{error}</p>
        ) : partners.length === 0 ? (
          <p className="col-span-4 text-center">No partners yet.</p>
        ) : (
          partners.map((partner, idx) => (
            <motion.div
              key={partner._id || idx}
              whileHover={{ scale: 1.05, translateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={partner.document ? `/uploads/partners/${partner.document}` : `https://placehold.co/150x150?text=${encodeURIComponent(partner.businessName)}`}
                alt={partner.businessName}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-green-700 text-center">{partner.businessName}</h3>
              <p className="text-gray-600 text-sm mt-2">{partner.contactPerson}</p>
              <p className="text-gray-500 text-xs">{partner.email}</p>
              <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${partner.status === "approved" ? "bg-green-100 text-green-700" : partner.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                {partner.status}
              </span>
            </motion.div>
          ))
        )}
      </section>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Want to Join as a Partner?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Partner with Fresh Basket to bring fresh and organic groceries to our customers. Let's grow together and make healthy living accessible for everyone.
        </p>
        <button
          onClick={() => navigate("/partner-apply")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}
