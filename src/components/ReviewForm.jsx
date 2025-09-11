import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId, userId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/review/add", {
        product: productId,
        rating,
        comment,
        user: userId,
      });
      setRating(5);
      setComment("");
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <label>Rating:</label>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <br />
      <label>Comment:</label>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <br />
      <button type="submit" disabled={loading}>Submit</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default ReviewForm;
