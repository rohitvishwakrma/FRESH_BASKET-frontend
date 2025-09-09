import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerAdminDashboard() {
  const [pendingPartners, setPendingPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchPendingPartners();
    // Notification logic: show when new partner applies
    const interval = setInterval(() => {
      fetchPendingPartners(true);
    }, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchPendingPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/partners/pending");
      // Notification: if new pending partner arrives
      if (pendingPartners.length && res.data.length > pendingPartners.length) {
        setNotification("New partner application received!");
        setTimeout(() => setNotification(""), 4000);
      }
      setPendingPartners(res.data);
    } catch (err) {
      setError("Failed to fetch pending partners.");
    }
    setLoading(false);
  };

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`/api/partners/${id}`, { status });
      setShowModal(false);
      setSelectedPartner(null);
      fetchPendingPartners();
    } catch (err) {
      setError(`Failed to ${status} partner.`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        Pending Partner Applications
        {pendingPartners.length > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">
            {pendingPartners.length}
          </span>
        )}
      </h2>
      {notification && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded shadow">
          {notification}
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pendingPartners.length === 0 && !loading ? (
        <p>No pending applications.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2">Business Name</th>
              <th className="p-2">Contact Person</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Message</th>
              <th className="p-2">Document</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingPartners.map((partner) => (
              <tr key={partner._id} className="border-t">
                <td className="p-2">{partner.businessName}</td>
                <td className="p-2">{partner.contactPerson}</td>
                <td className="p-2">{partner.email}</td>
                <td className="p-2">{partner.phone}</td>
                <td className="p-2">{partner.message}</td>
                <td className="p-2">
                  {partner.document ? (
                    <a href={`/uploads/partners/${partner.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => { setSelectedPartner(partner); setShowModal(true); }}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve/Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for partner approval */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-green-700">Review Partner Application</h3>
            <div className="mb-2"><strong>Business Name:</strong> {selectedPartner.businessName}</div>
            <div className="mb-2"><strong>Contact Person:</strong> {selectedPartner.contactPerson}</div>
            <div className="mb-2"><strong>Email:</strong> {selectedPartner.email}</div>
            <div className="mb-2"><strong>Phone:</strong> {selectedPartner.phone}</div>
            <div className="mb-2"><strong>Message:</strong> {selectedPartner.message}</div>
            <div className="mb-2"><strong>Document:</strong> {selectedPartner.document ? (
              <a href={`/uploads/partners/${selectedPartner.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
            ) : "-"}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleAction(selectedPartner._id, "approved")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(selectedPartner._id, "rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
              <button
                onClick={() => { setShowModal(false); setSelectedPartner(null); }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
