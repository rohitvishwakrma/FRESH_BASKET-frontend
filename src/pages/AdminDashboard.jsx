import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle, Search, Filter, Download, Bell, User, Eye } from "lucide-react";

export default function AdminDashboard() {
  const [pendingPartners, setPendingPartners] = useState([]);
  const [approvedPartners, setApprovedPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const pendingRes = await axios.get("/api/partners/pending");
      const approvedRes = await axios.get("/api/partners/approved");
      setPendingPartners(pendingRes.data);
      setApprovedPartners(approvedRes.data);
    } catch (err) {
      setError(" Failed to fetch partners.");
    }
    setLoading(false);
  };

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`/api/partners/${id}`, { status });
      setShowModal(false);
      setSelectedPartner(null);
      fetchPartners();
    } catch (err) {
      setError(` Failed to ${status} partner.`);
    }
  };

  // Filter partners based on search term and status
  const searchLower = searchTerm.toLowerCase();
  const filteredPendingPartners = pendingPartners.filter(partner => {
    const status = (partner.status || "pending").toLowerCase();
    return (
      partner.businessName.toLowerCase().includes(searchLower) ||
      partner.contactPerson.toLowerCase().includes(searchLower) ||
      partner.email.toLowerCase().includes(searchLower) ||
      (partner.phone && partner.phone.toLowerCase().includes(searchLower)) ||
      (partner.message && partner.message.toLowerCase().includes(searchLower)) ||
      status.includes(searchLower)
    );
  });

  const filteredApprovedPartners = approvedPartners.filter(partner => {
    const status = (partner.status || "approved").toLowerCase();
    return (
      partner.businessName.toLowerCase().includes(searchLower) ||
      partner.contactPerson.toLowerCase().includes(searchLower) ||
      partner.email.toLowerCase().includes(searchLower) ||
      (partner.phone && partner.phone.toLowerCase().includes(searchLower)) ||
      (partner.message && partner.message.toLowerCase().includes(searchLower)) ||
      status.includes(searchLower)
    );
  });

  // Summary cards for dashboard
  const summaryCards = [
    {
      title: "Pending Partners",
      count: pendingPartners.length,
      color: "bg-yellow-100 border-yellow-300",
      textColor: "text-yellow-700",
      icon: <Loader2 className="w-6 h-6 animate-spin" />,
    },
    {
      title: "Approved Sellers",
      count: approvedPartners.length,
      color: "bg-green-100 border-green-300",
      textColor: "text-green-700",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Total Partners",
      count: pendingPartners.length + approvedPartners.length,
      color: "bg-blue-100 border-blue-300",
      textColor: "text-blue-700",
      icon: <span className="text-xl">👥</span>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage partner applications and approvals</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search partners..."
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        

        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, idx) => (
            <div key={idx} className={`rounded-lg border p-6 ${card.color} transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm font-medium ${card.textColor}`}>{card.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>{card.count}</p>
                </div>
                <div className={`p-3 rounded-full ${card.textColor} bg-white bg-opacity-50`}>
                  {card.icon}
                </div>
              </div>
              <p className={`text-xs ${card.textColor} mt-4`}>
                {card.title === "Pending Partners" && "Waiting for review"}
                {card.title === "Approved Sellers" && "Active partners"}
                {card.title === "Total Partners" && "All applications"}
              </p>
            </div>
          ))}
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-12 mb-6 bg-white rounded-xl shadow-sm">
            <Loader2 className="animate-spin text-green-600 w-8 h-8 mr-2" />
            <span className="text-gray-600">Loading partners...</span>
          </div>
        )}

        {/* Content Area */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 flex items-center ${
                    activeTab === 'pending'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending Applications
                  {pendingPartners.length > 0 && (
                    <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {pendingPartners.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'approved'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Approved Sellers
                </button>
              </nav>
            </div>

            {/* Pending Applications Table */}
            {activeTab === 'pending' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <p className="text-gray-600">Review and approve new partner applications</p>
                </div>

                {filteredPendingPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <div className="text-gray-400 mb-2">No pending applications</div>
                    <p className="text-gray-500">All partner applications have been processed.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Business
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Document
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPendingPartners.map((partner) => (
                          <tr key={partner._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{partner.businessName}</div>
                              <div className="text-sm text-gray-500">{partner.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{partner.contactPerson}</div>
                              <div className="text-sm text-gray-500">{partner.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 max-w-xs truncate">{partner.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {partner.document ? (
                                <a
                                  href={`/uploads/partners/${partner.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Document
                                </a>
                              ) : (
                                <span className="text-sm text-gray-400">No document</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  setSelectedPartner(partner);
                                  setShowModal(true);
                                }}
                                className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg font-medium"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Approved Sellers Table */}
            {activeTab === 'approved' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <p className="text-gray-600">View and manage approved partners</p>
                  <div className="flex gap-2">
                  </div>
                </div>

                {filteredApprovedPartners.length === 0 ? (
                  <div className="text-center py-10">
                    <XCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <div className="text-gray-400 mb-2">No approved sellers yet</div>
                    <p className="text-gray-500">Approved partners will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Business
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Document
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApprovedPartners.map((partner) => (
                          <tr key={partner._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{partner.businessName}</div>
                              <div className="text-sm text-gray-500">{partner.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{partner.contactPerson}</div>
                              <div className="text-sm text-gray-500">{partner.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 max-w-xs truncate">{partner.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {partner.document ? (
                                <a
                                  href={`/uploads/partners/${partner.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Document
                                </a>
                              ) : (
                                <span className="text-sm text-gray-400">No document</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                                Approved
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Review Modal */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Review Partner Application</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Business Name</label>
                  <p className="text-gray-900">{selectedPartner.businessName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Contact Person</label>
                  <p className="text-gray-900">{selectedPartner.contactPerson}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <p className="text-gray-900">{selectedPartner.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <p className="text-gray-900">{selectedPartner.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedPartner.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Document</label>
                {selectedPartner.document ? (
                  <a
                    href={`/uploads/partners/${selectedPartner.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View uploaded document
                  </a>
                ) : (
                  <p className="text-gray-500">No document uploaded</p>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedPartner(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction(selectedPartner._id, "rejected")}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100"
                >
                  <XCircle className="w-5 h-5" /> Reject
                </button>
                <button
                  onClick={() => handleAction(selectedPartner._id, "approved")}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" /> Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}