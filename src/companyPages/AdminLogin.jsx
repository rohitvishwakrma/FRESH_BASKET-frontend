import React, { useState } from "react";
import axios from "axios";

// AdminLogin.jsx - Simple admin login form
export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Replace with your actual admin login API endpoint
      const { data } = await axios.post("/api/admin/login", form);
  setSuccess("Login successful!");
  // Redirect to admin dashboard
  window.location.href = "/admin-dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials or server error."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Admin Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password" autoComplete="current-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
