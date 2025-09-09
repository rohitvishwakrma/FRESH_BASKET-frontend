import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PartnerApproval() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending applications
  const fetchPendingPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partners/pending");
      const data = await res.json();
      setPartners(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPartners();
  }, []);

  // Approve or Reject partner
  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      if (res.ok) {
        alert(`Partner ${action} successfully!`);
        fetchPendingPartners(); // Refresh list
      } else {
        alert("Failed to update partner status!");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating status.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading pending partners...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Pending Partner Applications
      </h1>

      {partners.length === 0 ? (
        <p className="text-gray-700 text-center">No pending applications!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {partner.businessName}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Contact Person:</strong> {partner.contactPerson}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {partner.email}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Phone:</strong> {partner.phone}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Message:</strong> {partner.message}
              </p>
              {partner.document && (
                <a
                  href={`http://localhost:5000/uploads/partners/${partner.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mb-4"
                >
                  View Document
                </a>
              )}

              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => handleAction(partner._id, "approved")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(partner._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
