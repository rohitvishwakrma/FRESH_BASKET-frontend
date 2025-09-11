import React, { useEffect, useState } from "react";
import axios from "axios";

const UserRequests = ({ userId }) => {
  const [refunds, setRefunds] = useState([]);
  const [cancellations, setCancellations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const refundRes = await axios.get("/api/refund/user", { params: { user: userId } });
        const cancelRes = await axios.get("/api/cancellation/user", { params: { user: userId } });
        setRefunds(refundRes.data.refunds || []);
        setCancellations(cancelRes.data.cancellations || []);
      } catch {
        setRefunds([]);
        setCancellations([]);
      }
      setLoading(false);
    };
    fetchRequests();
  }, [userId]);

  if (loading) return <div>Loading your requests...</div>;

  return (
    <div>
      <h2>Your Refund Requests</h2>
      {refunds.map(r => (
        <div key={r._id} style={{borderBottom:'1px solid #ccc',marginBottom:8}}>
          <strong>Order:</strong> {r.order?._id}
          <div><strong>Reason:</strong> {r.reason}</div>
          <div><strong>Status:</strong> {r.status}</div>
        </div>
      ))}
      <h2>Your Cancellation Requests</h2>
      {cancellations.map(c => (
        <div key={c._id} style={{borderBottom:'1px solid #ccc',marginBottom:8}}>
          <strong>Order:</strong> {c.order?._id}
          <div><strong>Reason:</strong> {c.reason}</div>
          <div><strong>Status:</strong> {c.status}</div>
        </div>
      ))}
    </div>
  );
};

export default UserRequests;
