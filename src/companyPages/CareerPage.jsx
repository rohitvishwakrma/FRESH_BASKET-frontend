import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const jobOpenings = [
  {
    title: "Frontend Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    description:
      "Join our engineering team to build user-friendly and scalable web applications using React, Tailwind CSS, and modern frameworks.",
  },
  {
    title: "Backend Developer",
    location: "Remote",
    type: "Full-time",
    description:
      "Work with Node.js, Express, and databases to build scalable APIs that power Fresh Basket’s grocery delivery platform.",
  },
  {
    title: "UI/UX Designer",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Design delightful user experiences with a focus on simplicity, usability, and accessibility for millions of customers.",
  },
  {
    title: "Marketing Specialist",
    location: "Delhi, India",
    type: "Part-time",
    description:
      "Help us grow Fresh Basket by creating campaigns, content, and strategies that connect with customers effectively.",
  },
];

export default function CareerPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-50 max-w-6xl sm:px-6 mx-auto px-6 py-10 "
    >
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-800">
          Careers at Fresh Basket
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Be part of our mission to bring fresh groceries, healthier choices, and
          innovative technology to every household in India.
        </p>
      </header>

      {/* Job Openings */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-green-700">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobOpenings.map((job, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              <h3 className="text-2xl font-semibold text-green-800">
                {job.title}
              </h3>
              <p className="text-gray-600 mt-1">{job.location}</p>
              <p className="text-sm text-gray-500">{job.type}</p>
              <p className="mt-4 text-gray-700 flex-grow">{job.description}</p>

              {/* Apply Button */}
              <button
                onClick={() =>
                  navigate("/apply", { state: { jobTitle: job.title } })
                }
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
