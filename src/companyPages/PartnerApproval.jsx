import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PartnerApproval() {
  const [pendingPartners, setPendingPartners] = useState([]);
  const [approvedPartners, setApprovedPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending and approved applications
  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const pendingRes = await fetch("http://localhost:5000/api/partners/pending", {
        headers: { Authorization: `Bearer ${token}` }
      });
      let pendingData = await pendingRes.json();
      if (!pendingRes.ok) {
        setPendingPartners([]);
        setError(pendingData.message || "Unauthorized or server error fetching pending partners.");
      } else {
        setPendingPartners(Array.isArray(pendingData) ? pendingData : []);
      }
      const approvedRes = await fetch("http://localhost:5000/api/partners/approved", {
        headers: { Authorization: `Bearer ${token}` }
      });
      let approvedData = await approvedRes.json();
      if (!approvedRes.ok) {
        setApprovedPartners([]);
        setError(approvedData.message || "Unauthorized or server error fetching approved partners.");
      } else {
        setApprovedPartners(Array.isArray(approvedData) ? approvedData : []);
      }
      setLoading(false);
    } catch (error) {
      setError("Network error fetching partners.");
      setPendingPartners([]);
      setApprovedPartners([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
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
        fetchPartners(); // Refresh lists
      } else {
        alert("Failed to update partner status!");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating status.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading partners...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

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

      {pendingPartners.length === 0 ? (
        <p className="text-gray-700 text-center">No pending applications!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pendingPartners.map((partner) => (
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

      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Approved Partners
      </h1>
      {approvedPartners.length === 0 ? (
        <p className="text-gray-700 text-center">No approved partners yet.</p>
      ) : (
        <table className="w-full border mb-10">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2">Business Name</th>
              <th className="p-2">Contact Person</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Message</th>
              <th className="p-2">Document</th>
            </tr>
          </thead>
          <tbody>
            {approvedPartners.map((partner) => (
              <tr key={partner._id} className="border-t">
                <td className="p-2">{partner.businessName}</td>
                <td className="p-2">{partner.contactPerson}</td>
                <td className="p-2">{partner.email}</td>
                <td className="p-2">{partner.phone}</td>
                <td className="p-2">{partner.message}</td>
                <td className="p-2">
                  {partner.document ? (
                    <a href={`http://localhost:5000/uploads/partners/${partner.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}