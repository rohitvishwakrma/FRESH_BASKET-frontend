import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail,
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  RefreshCw,
  Info
} from "lucide-react";

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const guides = [
    {
      category: "Ordering",
      icon: <ShoppingCart className="w-5 h-5" />,
      description: "Easily browse our wide selection of fresh products and place your order in just a few clicks. Add items to your cart, review your selections, and confirm your purchase. Our intuitive ordering process ensures a smooth and hassle-free experience every time.",
      details: [
        
      ],
    },
    {
      category: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
      description: "We offer secure and convenient payment options, including credit/debit cards, UPI, and digital wallets. All transactions are encrypted for your safety. If you face any issues during payment, our support team is here to help.",
      details: [
        
      ],
    },
    {
      category: "Delivery",
      icon: <Truck className="w-5 h-5" />,
      description: "Enjoy fast and reliable delivery to your doorstep. Track your order in real-time and receive updates on estimated arrival. Our delivery partners ensure your products reach you fresh and on time, every time.",
      details: [
    ],
    },
    {
      category: "Account",
      icon: <User className="w-5 h-5" />,
      description: "Manage your account details, addresses, and preferences with ease. Update your profile, view order history, and set notification preferences to stay informed about offers and updates.",
      details: [],
    },
    {
      category: "Returns & Refunds",
      icon: <RefreshCw className="w-5 h-5" />,
      description: "If you're not satisfied with a product, you can request a return or refund within our policy period. Our team will guide you through the process and ensure a quick resolution, so you shop with confidence.",
      details: [
        
      ],
    },
    {
      category: "Product Information",
      icon: <Info className="w-5 h-5" />,
      description: "Get comprehensive details about every product, including sourcing, certifications, and health benefits. We provide transparent information so you can make the best choices for your needs and lifestyle.",
      details: [] // Removed all the specific questions
    },
  ];

  // Filter guides based on search term
  const filteredGuides = searchTerm
    ? guides.filter(guide => 
        guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.details.some(detail => 
          detail.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : guides;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions, step-by-step guides, and tutorials for Fresh Basket.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help articles..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
            <button className="text-green-600 font-medium text-sm hover:underline">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm mb-2">Mon-Fri: 8am-8pm</p>
            <p className="text-gray-600 text-sm mb-4">Sat-Sun: 9am-5pm</p>
            <button className="text-blue-600 font-medium text-sm hover:underline">
              +1 (91) 99999-99999
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">We'll respond within 24 hours</p>
            <button className="text-purple-600 font-medium text-sm hover:underline">
              support@freshbasket.com
            </button>
          </div>
        </div>

        {/* Guides Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Help Guides
          </h2>
          
          {filteredGuides.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No results found for "{searchTerm}"</p>
              <p className="text-gray-400 text-sm mt-2">Try different keywords or contact our support team</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGuides.map((guide, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
                >
                  {/* Category Header */}
                  <button
                    className="w-full text-left p-5 bg-green-50 hover:bg-green-100 flex justify-between items-center"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <div className="flex items-center">
                      <span className="text-green-600 mr-3">{guide.icon}</span>
                      <span className="font-semibold text-lg text-green-800">
                        {guide.category}
                      </span>
                    </div>
                    <span className="text-green-600">
                      {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {/* Expandable Details */}
                  {openIndex === index && (
                    <div className="p-5 bg-white">
                      <p className="text-gray-700 mb-4">
                        {guide.description}
                      </p>
                      {guide.details.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-800">Common questions:</h4>
                          {guide.details.map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                              </div>
                              <p className="text-gray-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Help Section */}
        <div className="bg-blue-50 rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Still need help?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to assist you with any questions or concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/Contactus" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/Faqs" 
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}