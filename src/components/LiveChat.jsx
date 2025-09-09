import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

// Setup Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for all messages (user + AI)
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "User", text: input, time: new Date().toLocaleTimeString() };

    // Emit to server (don’t add locally, avoid duplicates)
    socket.emit("sendMessage", userMsg);

    setInput("");

    try {
      // Call Gemini AI
      const result = await model.generateContent(input);
      const aiResponse = result.response.text();

      const botMsg = { sender: "AI", text: aiResponse, time: new Date().toLocaleTimeString() };

      // Add AI locally & broadcast
      setMessages((prev) => [...prev, botMsg]);
      socket.emit("sendMessage", botMsg);
    } catch (error) {
      console.error("Gemini API Error:", error);

      const errorMsg = {
        sender: "AI",
        text: "⚠️ Sorry, AI is unavailable right now.",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
      socket.emit("sendMessage", errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 font-semibold">
          Fresh-Basket AI Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "User"
                  ? "bg-green-100 ml-auto text-right"
                  : msg.sender === "AI"
                  ? "bg-blue-100 mr-auto"
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
