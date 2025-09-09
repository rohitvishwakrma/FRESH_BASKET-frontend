// src/FreshArticlePage.jsx
import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Healthy Eating Made Simple",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    content: `
Eating healthy doesn't have to be complicated. Incorporating fresh fruits and vegetables into your daily meals ensures that your body receives essential nutrients, vitamins, and minerals. A diet rich in colorful produce not only boosts immunity but also improves digestion and promotes overall well-being. Start your day with a fruit smoothie or a bowl of oatmeal topped with berries. Include a variety of vegetables in your lunch and dinner, such as leafy greens, carrots, and bell peppers. Snack on nuts and fresh fruit instead of processed items to keep energy levels stable throughout the day. Hydrate regularly with water or infused water to aid metabolism and detoxification. Remember, healthy eating is a lifestyle, not a temporary diet. Making small, consistent changes in your food choices can lead to long-term health benefits, weight management, and increased vitality. By planning your meals and including diverse, nutrient-dense foods, you create a foundation for a healthier, happier life. Eating whole foods, avoiding excess sugar, and limiting processed ingredients ensures that your body functions optimally. Consistency and variety are key: rotate fruits and vegetables, try new recipes, and embrace seasonal produce to maximize both flavor and nutrition. Ultimately, enjoying your food mindfully enhances the benefits of healthy eating while keeping it sustainable and pleasurable. 
    `,
  },
  {
    title: "Fitness & Nutrition",
    img: "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?q=80",
    content: `
Nutrition is a cornerstone of fitness and overall health. Eating the right foods before and after exercise enhances performance, speeds recovery, and supports muscle growth. Protein-rich foods like eggs, lean meats, beans, and dairy help repair muscle tissues, while complex carbohydrates such as whole grains provide lasting energy for workouts. Incorporating vegetables and fruits ensures sufficient vitamins and antioxidants, reducing inflammation and improving endurance. Hydration is equally vital: water and electrolyte-rich drinks prevent fatigue and support metabolic processes. Planning meals around your fitness goals, whether it's weight loss, strength building, or endurance, helps maintain energy balance. Snack smartly with items like yogurt, nuts, and smoothies to fuel the body without overloading it with empty calories. Combining proper nutrition with a consistent exercise routine ensures that you achieve desired results efficiently. Remember, the timing of meals matters: eat a balanced meal 2–3 hours before exercising, and refuel within 30–60 minutes post-workout to optimize recovery. Supplements can support nutrition, but whole foods remain the best source of vitamins and minerals. By aligning diet with fitness, you enhance physical performance, mental focus, and long-term well-being.
    `,
  },
  {
    title: "Easy Home Recipes",
    img: "https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?q=80",
    content: `
Cooking at home is not only cost-effective but also empowers you to control ingredients, portion sizes, and flavors. Preparing simple, healthy meals can transform your diet and encourage mindful eating. Start with easy breakfast ideas such as avocado toast, smoothie bowls, or overnight oats. For lunch and dinner, opt for balanced plates combining lean proteins, whole grains, and a variety of vegetables. Stir-fries, salads, soups, and baked dishes are versatile, flavorful, and nutrient-dense. Experiment with herbs and spices instead of salt and sugar to enhance taste while keeping meals healthy. Meal prepping can save time and reduce the temptation of unhealthy fast food, ensuring that nutritious options are always available. Incorporate seasonal produce to maximize freshness, flavor, and cost efficiency. Sharing meals with family or friends encourages a positive relationship with food and promotes healthy habits. Homemade meals allow for creativity and personalization, catering to dietary restrictions or preferences. With simple tools, a well-stocked pantry, and a few fresh ingredients, you can create diverse, satisfying, and wholesome dishes that delight the senses while supporting your overall health.
    `,
  },
  {
    title: "Support Local Farmers",
    img: "https://plus.unsplash.com/premium_photo-1679428401832-37cc21a5647d?q=80",
    content: `
Supporting local farmers strengthens communities and ensures access to fresh, high-quality produce. Buying from local farms reduces the distance food travels, preserving nutrients and flavors while minimizing environmental impact. Local produce often comes at peak freshness, harvested when ripe, which enhances taste and nutritional content. By choosing locally grown fruits, vegetables, dairy, and other essentials, consumers contribute to the livelihoods of farmers and help sustain regional agriculture. Seasonal foods are abundant, affordable, and environmentally friendly, as they do not require excessive energy for storage or transport. Many farmers practice organic or sustainable methods, offering healthier options free from harmful chemicals. Participating in community-supported agriculture programs or farmers’ markets fosters connections with food sources and increases awareness of how food is grown. Educating yourself about local crops and cooking with fresh, regional ingredients encourages mindful eating and creativity in the kitchen. Supporting local farmers is an investment in health, sustainability, and stronger communities.
    `,
  },
  {
    title: "Sustainability Matters",
    img: "https://images.unsplash.com/photo-1684699246921-57d41493b8a1?q=80",
    content: `
Sustainable food practices are essential for preserving the environment and ensuring future food security. Reducing food waste, choosing eco-friendly packaging, and buying seasonal produce contribute to a smaller ecological footprint. Sustainable farming techniques, such as crop rotation, organic fertilization, and minimal pesticide use, protect soil health, biodiversity, and water resources. Consumers can participate by planning meals, storing food properly, composting leftovers, and avoiding over-purchasing. Supporting brands and stores that prioritize sustainability encourages industry-wide adoption of eco-conscious practices. Making environmentally responsible choices not only benefits the planet but also promotes healthier, chemical-free foods. Understanding the journey from farm to table creates awareness about the environmental impact of food consumption. Small, consistent actions—like using reusable bags, reducing single-use plastics, and choosing locally grown produce—make a tangible difference. Sustainability aligns with personal health, community well-being, and global responsibility, creating a harmonious balance between nutrition and environmental stewardship.
    `,
  },
  {
    title: "Quality & Freshness Guaranteed",
    img: "https://images.unsplash.com/photo-1755752914184-4926bf6b64ef?q=80",
    content: `
Freshness and quality are fundamental to a satisfying and healthy diet. Selecting high-quality ingredients ensures optimal flavor, nutrient retention, and safety. Fruits and vegetables should be vibrant, firm, and free from spoilage. Proteins like meat, fish, and dairy require proper storage and handling to maintain freshness and prevent contamination. Regularly checking expiration dates and storing food correctly prolongs shelf life and preserves taste. Buying from trusted sources, including local farmers and reputable grocery services, provides confidence in the quality of food consumed. Fresh ingredients enhance culinary experiences, allowing meals to be both nutritious and enjoyable. Quality and freshness are not just about appearance—they impact health, digestion, and overall well-being. Investing time in selecting fresh foods, storing them properly, and using them promptly elevates daily meals and encourages a consistent healthy lifestyle. Ultimately, freshness and quality form the foundation of nutritious, flavorful, and satisfying eating habits.
    `,
  },
];

export default function FreshArticlePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-50 min-h-screen px-4 sm:px-6 py-8"
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-green-800">
            Fresh Basket Insights
          </h1>
          <p className="text-lg text-black">
            Explore tips, healthy eating habits, fitness, sustainability, and more.
          </p>
        </header>

        {sections.map((section, idx) => (
          <section key={idx} className="mb-16">
      <h2 className="text-3xl font-bold mb-4 text-green-800">{section.title}</h2>
      <div className="w-full overflow-hidden rounded-lg mb-6">
         <img
          src={section.img}
          alt={section.title}
            className="w-full max-h-11/12 object-contain"
         />
         </div>
  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-justify">
    {section.content}
  </p>
</section>

        ))}
      </div>
    </motion.div>
  );
}
