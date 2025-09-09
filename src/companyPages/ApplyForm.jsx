import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ApplyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.jobTitle || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [resumeName, setResumeName] = useState("No file chosen");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setResumeName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("coverLetter", formData.coverLetter);
      form.append("jobTitle", jobTitle);
      form.append("resume", formData.resume);

      const res = await fetch("http://localhost:5000/api/career/apply", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Application submitted successfully!");
        navigate("/career");
      } else {
        alert(data.message || "Submission failed!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting.");
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-6 py-10"
    >
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-800">
          Apply for {jobTitle}
        </h1>
        <p className="mt-4 text-green-700">
          Fill in your details and upload your resume to join our Fresh Basket team.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            required
            className="w-full"
          />
          <p className="mt-1 text-gray-500">
            {formData.resume ? `Selected File: ${formData.resume.name}` : "Choose your resume (PDF format)"}
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
            placeholder="Write a brief introduction..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          Submit Application
        </button>
      </form>
    </motion.div>
  );
}
