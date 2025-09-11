
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PartnerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post("/api/partners/login", form);
      if (data.success) {
        setSuccess("Login successful! You are now a seller.");
        setTimeout(() => navigate("/seller"), 1200);
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Partner Login</h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" value={form.email || ""} onChange={handleChange} required className="w-full border rounded px-3 py-2" autoComplete="username" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input type="password" autoComplete="current-password" name="password" value={form.password || ""} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded font-semibold">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
