import React, { useState } from 'react';

const blogPosts = [
  {
    title: "10 Must-Try Global Street Foods You Can Make at Home",
    content: "Explore delicious street foods from around the world you can recreate at home — spicy tacos, savory dumplings, and more!"
  },
  {
    title: "How to Master the Art of Sourdough Baking",
    content: "Learn how to create your own sourdough starter and bake crusty, flavorful bread with simple steps."
  },
  {
    title: "The Ultimate Guide to Plant-Based Proteins",
    content: "Discover various plant-based protein sources and how to incorporate them into your meals for balanced nutrition."
  },
  {
    title: "Secrets to Perfect Homemade Pasta Every Time",
    content: "Unlock tips and tricks for fresh pasta dough, rolling, and cooking to impress at home."
  },
  {
    title: "Exploring the World’s Spiciest Dishes",
    content: "A fiery journey into the spiciest dishes worldwide, including handling tips and flavor profiles."
  },
  {
    title: "Healthy Comfort Foods That Nourish Your Soul",
    content: "Wholesome recipes that satisfy cravings and nourish your body."
  },
  {
    title: "Seasonal Cooking: What to Eat This Spring",
    content: "A guide to spring produce and recipes that make the most of the season’s freshest ingredients."
  },
  {
    title: "Fermentation 101: Benefits & Easy Recipes",
    content: "Learn fermentation basics and try easy recipes like kimchi, sauerkraut, and yogurt."
  },
  {
    title: "Food Waste Hacks: Save Money and the Planet",
    content: "Practical tips to reduce food waste and save money in your kitchen."
  },
  {
    title: "Top 5 Superfoods to Boost Your Energy",
    content: "Explore nutrient-packed superfoods that help boost energy and support health."
  },
];

export default function FoodBlogPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        Food Blog Articles
      </h1>
      <ul className="space-y-6">
        {blogPosts.map(({ title, content }, i) => (
          <li
            key={i}
            className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => toggleExpand(i)}
              className="w-full flex justify-between items-center px-6 py-4 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
              aria-expanded={expandedIndex === i}
            >
              <span className="text-lg font-semibold text-indigo-900">{title}</span>
              <span className="text-indigo-900 font-bold text-2xl select-none">
                {expandedIndex === i ? '−' : '+'}
              </span>
            </button>
            {expandedIndex === i && (
              <div className="p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                <p>{content}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
