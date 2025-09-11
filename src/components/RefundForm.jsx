import React, { useState } from "react";
import axios from "axios";

const RefundForm = ({ orderId, userId, onRefundRequested }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/refund/request", {
        order: orderId,
        reason,
        user: userId,
      });
      setReason("");
      if (onRefundRequested) onRefundRequested();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request refund");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Request a Refund</h3>
      <label>Reason:</label>
      <textarea value={reason} onChange={e => setReason(e.target.value)} />
      <br />
      <button type="submit" disabled={loading}>Submit</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default RefundForm;
