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

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getBotResponse(input.trim()),
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Response map with multiple variations for each category
    const responseMap: { [key: string]: string[] } = {
        greetings: [
            "Hello! How can I assist you today?",
            "Hi there! What can I help you with?",
            "Hey! How’s it going?",
            "Hello! What do you need help with?"
        ],
        smallTalk: [
            "I'm just here, ready to assist you!",
            "All good! How about you?",
            "Just a bot, living the code life!",
            "Doing great! What’s on your mind?"
        ],
        personalQuestions: [
            "I'm here to make your day easier!",
            "I’m a chatbot, so no feelings, but I’m here to help!",
            "My purpose is to assist you. What would you like to know?",
            "I'm here to chat, so ask me anything!"
        ],
        informationRequests: [
            "Here’s what I found...",
            "Let me get that information for you!",
            "Good question! Here’s some info...",
            "Let’s dive into that topic!"
        ],
        recommendations: [
            "I recommend giving it a try!",
            "Based on what I know, this could be a great choice!",
            "How about trying this?",
            "Maybe this would work for you!"
        ],
        acknowledgments: [
            "You're welcome!",
            "Glad to be of help!",
            "Happy to assist!",
            "Anytime!"
        ],
        jokes: [
            "Why did the JavaScript developer go broke? Because he couldn’t 'callback' his function!",
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "I would tell you a UDP joke, but I’m not sure you’d get it.",
            "Why was the developer so broke? Because he used up all his cache!"
        ],
        motivationalQuotes: [
            "Keep pushing forward, you’re doing great!",
            "Believe in yourself! You’ve got this.",
            "Success is just a few lines of code away!",
            "Never stop learning – the journey is worth it!"
        ],
        weather: [
            "I wish I could see the sky! Why not check your local weather app?",
            "I'm not equipped with real-time data, but it’s always a good idea to stay prepared!",
            "Check outside the window for the most accurate forecast!",
            "I’d suggest grabbing an umbrella just in case!"
        ],
        goodbye: [
            "Goodbye! Have a great day!",
            "See you soon!",
            "Take care! Talk to you later!",
            "Bye! Hope to see you again!"
        ],
        fallback: [
            "I'm not sure how to respond to that. Can you please rephrase?",
            "Could you clarify your question?",
            "I didn’t understand that. Could you try asking again?",
            "Hmm, I’m not sure. Could you try asking differently?"
        ]
    };

    // Helper function to pick a random response from a category
    const getRandomResponse = (responses: string[]): string => {
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Matching input to response categories
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return getRandomResponse(responseMap.greetings);
    } else if (lowerInput.includes('how are you') || lowerInput.includes('who are you') || lowerInput.includes('what are you')) {
        return getRandomResponse(responseMap.personalQuestions);
    } else if (lowerInput.includes('how’s it going') || lowerInput.includes('what’s up')) {
        return getRandomResponse(responseMap.smallTalk);
    } else if (lowerInput.includes('tell me about') || lowerInput.includes('what is') || lowerInput.includes('info on')) {
        return getRandomResponse(responseMap.informationRequests);
    } else if (lowerInput.includes('suggest') || lowerInput.includes('recommend')) {
        return getRandomResponse(responseMap.recommendations);
    } else if (lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
        return getRandomResponse(responseMap.acknowledgments);
    } else if (lowerInput.includes('joke') || lowerInput.includes('funny')) {
        return getRandomResponse(responseMap.jokes);
    } else if (lowerInput.includes('motivate') || lowerInput.includes('inspire') || lowerInput.includes('quote')) {
        return getRandomResponse(responseMap.motivationalQuotes);
    } else if (lowerInput.includes('weather')) {
        return getRandomResponse(responseMap.weather);
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye') || lowerInput.includes('see you')) {
        return getRandomResponse(responseMap.goodbye);
    } else {
        return getRandomResponse(responseMap.fallback);
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
