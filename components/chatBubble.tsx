// ChatbotBubble.tsx
import React, { useState } from "react";
import ChatInterface from "./ChatInterface";

const ChatbotBubble: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Chatbot Bubble */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 z-50"
      >
        💬
      </button>

      {/* Show chat interface if open */}
      {isChatOpen && <ChatInterface closeChat={toggleChat} />}
    </div>
  );
};

export default ChatbotBubble;
