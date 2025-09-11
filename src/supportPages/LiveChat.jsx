import React from "react";

export default function LiveChat() {
  // Live chat feature is currently unavailable
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 font-semibold">
          Fresh-Basket Live Chat
        </div>
        {/* Disabled message */}
        <div className="flex-1 p-8 flex items-center justify-center text-gray-500">
          Live chat feature is currently unavailable.
        </div>
      </div>
    </div>
  );
}
