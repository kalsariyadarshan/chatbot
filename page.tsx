"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      const botResponseText = await fetchBotResponse(input.trim());

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };


  const fetchBotResponse = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`, 
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", 
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
          max_tokens: 10000,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        console.error("Unexpected response format:", data);
        return "I'm not sure how to respond to that.";
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "I'm having trouble connecting to my response service.";
    }
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-100 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat with AI Assistant
        </h2>
      </div>
      <div className="h-[600px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                {message.sender === "user" ? "U" : "B"}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
