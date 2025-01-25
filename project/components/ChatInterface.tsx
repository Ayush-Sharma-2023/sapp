import React, { useState, useEffect, useRef } from "react";

interface ChatInterfaceProps {
  closeChat: () => void;
}

interface ChatMessage {
  sender: "bot" | "user";
  message: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ closeChat }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "bot", message: "Hello, what can I do for you today?" },
  ]);

  const [allOptions, setAllOptions] = useState([
    { label: "I am feeling sick", value: "sick" },
    { label: "I have a headache", value: "headache" },
    { label: "Others", value: "others" },
  ]);

  const [visibleOptions, setVisibleOptions] = useState(allOptions.slice(0, 3)); // Display first 3 options
  const [currentPage, setCurrentPage] = useState(0); // Tracks pagination
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleOptionSelect = (optionValue: string) => {
    let responseMessage = "";

    // Dynamic response generation
    if (optionValue === "sick") {
      responseMessage = "I'm sorry to hear you're feeling sick. Please take care!";
    } else if (optionValue === "headache") {
      responseMessage = "A headache can be tough. Would you like some tips for relief?";
    } else if (optionValue === "others") {
      responseMessage = "Can you please elaborate on how you're feeling?";
      const newOptions = [
        { label: "I am feeling anxious", value: "anxious" },
        { label: "I am feeling tired", value: "tired" },
        { label: "I have body aches", value: "aches" },
        { label: "I am stressed", value: "stressed" },
        { label: "Back to main options", value: "back" },
      ];
      setAllOptions(newOptions);
      setVisibleOptions(newOptions.slice(0, 3)); // Show first 3 options from new batch
      setCurrentPage(0); // Reset pagination
    } else if (optionValue === "anxious") {
      responseMessage = "It can be difficult to feel anxious. Take deep breaths and relax!";
    } else if (optionValue === "tired") {
      responseMessage = "Being tired can be draining. Would you like some suggestions for energy?";
    } else if (optionValue === "aches") {
      responseMessage = "Body aches are common. Stretching and warm baths can help!";
    } else if (optionValue === "stressed") {
      responseMessage = "Stress is tough, but we can manage it. Try some relaxation techniques!";
    } else if (optionValue === "back") {
      responseMessage = "Welcome back! What can I assist you with today?";
      const mainOptions = [
        { label: "I am feeling sick", value: "sick" },
        { label: "I have a headache", value: "headache" },
        { label: "Others", value: "others" },
      ];
      setAllOptions(mainOptions);
      setVisibleOptions(mainOptions.slice(0, 3)); // Show first 3 main options
      setCurrentPage(0); // Reset pagination
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: optionValue },
      { sender: "bot", message: responseMessage },
    ]);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * 3;
    setVisibleOptions(allOptions.slice(startIndex, startIndex + 3));
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    const startIndex = prevPage * 3;
    setVisibleOptions(allOptions.slice(startIndex, startIndex + 3));
    setCurrentPage(prevPage);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl w-80 p-4 z-50">
      {/* Chat History */}
      <div className="chat-history h-64 overflow-y-scroll mb-4 space-y-4">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`${
              entry.sender === "bot" ? "text-gray-700 dark:text-gray-300" : "text-blue-500"
            }`}
          >
            <p
              className={`${
                entry.sender === "bot"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-blue-500 text-white"
              } p-2 rounded-md`}
            >
              {entry.message}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Options */}
      <div className="chat-options space-y-2">
        {visibleOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option.value)}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`p-2 rounded-md ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * 3 >= allOptions.length}
          className={`p-2 rounded-md ${
            (currentPage + 1) * 3 >= allOptions.length
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={closeChat}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
      >
        ✖
      </button>
    </div>
  );
};

export default ChatInterface;
