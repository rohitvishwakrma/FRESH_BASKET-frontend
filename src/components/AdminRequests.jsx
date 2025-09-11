import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminRequests = () => {
  const [refunds, setRefunds] = useState([]);
  const [cancellations, setCancellations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const refundRes = await axios.get("/api/admin/requests/refunds");
        const cancelRes = await axios.get("/api/admin/requests/cancellations");
        setRefunds(refundRes.data.refunds || []);
        setCancellations(cancelRes.data.cancellations || []);
      } catch {
        setRefunds([]);
        setCancellations([]);
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  const updateStatus = async (type, id, status) => {
    await axios.patch(`/api/admin/requests/${type}/${id}`, { status });
    window.location.reload();
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div>
      <h2>Refund Requests</h2>
      {refunds.map(r => (
        <div key={r._id} style={{borderBottom:'1px solid #ccc',marginBottom:8}}>
          <strong>Order:</strong> {r.order?._id} | <strong>User:</strong> {r.user?.name}
          <div><strong>Reason:</strong> {r.reason}</div>
          <div><strong>Status:</strong> {r.status}</div>
          <button onClick={() => updateStatus('refund', r._id, 'Approved')}>Approve</button>
          <button onClick={() => updateStatus('refund', r._id, 'Rejected')}>Reject</button>
        </div>
      ))}
      <h2>Cancellation Requests</h2>
      {cancellations.map(c => (
        <div key={c._id} style={{borderBottom:'1px solid #ccc',marginBottom:8}}>
          <strong>Order:</strong> {c.order?._id} | <strong>User:</strong> {c.user?.name}
          <div><strong>Reason:</strong> {c.reason}</div>
          <div><strong>Status:</strong> {c.status}</div>
          <button onClick={() => updateStatus('cancellation', c._id, 'Approved')}>Approve</button>
          <button onClick={() => updateStatus('cancellation', c._id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminRequests;
