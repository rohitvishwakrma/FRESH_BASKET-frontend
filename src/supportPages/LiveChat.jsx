import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to backend Socket.io server
const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { sender: "User", text: input, time: new Date().toLocaleTimeString() };
    
    // Send message to backend
    socket.emit("sendMessage", newMsg);

    // Add to local messages (optimistic UI)
    setMessages((prev) => [...prev, newMsg]);

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 text-white p-4 font-semibold">
          Fresh-Basket Live Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "User"
                  ? "bg-green-100 ml-auto text-right"
                  : "bg-gray-100 mr-auto"
              }`}
            >
              <p>{msg.text}</p>
              <small className="block text-gray-500 text-xs mt-1">{msg.time}</small>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-3 outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
