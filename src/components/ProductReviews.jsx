import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/review/product/${productId}`);
        setReviews(res.data.reviews || []);
      } catch {
        setReviews([]);
      }
      setLoading(false);
    };
    fetchReviews();
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews yet.</div>;

  return (
    <div>
      <h3>Product Reviews</h3>
      {reviews.map(r => (
        <div key={r._id} style={{borderBottom:'1px solid #ccc',marginBottom:8}}>
          <strong>{r.user?.name || "User"}</strong> - Rating: {r.rating}
          <div>{r.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
