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
        "Hello! What do you need help with?",
        "Hi! How’s your day going?",
        "Good to see you! How can I support you?",
        "Hello, friend! What brings you here?",
        "Hi! How can I be of service today?",
        "Hey there! Need some assistance?",
        "Hi, I'm here to help. What can I do for you?",
      ],
      smallTalk: [
        "I'm just here, ready to assist you!",
        "All good! How about you?",
        "Just a bot, living the code life!",
        "Doing great! What’s on your mind?",
        "I’m here 24/7, always ready to chat!",
        "I’m always learning new things! How can I help you today?",
        "I’m here for any questions or small talk, you name it!",
        "I’m happy to see you again! How’s everything going?",
        "Here and ready to assist. What can I help with?",
        "I’m doing well, just processing some data!",
      ],
      personalQuestions: [
        "I'm here to make your day easier!",
        "I’m a chatbot, so no feelings, but I’m here to help!",
        "My purpose is to assist you. What would you like to know?",
        "I'm here to chat, so ask me anything!",
        "No secrets here, I’m all code and conversation!",
        "I may not have a personal life, but I’m all yours!",
        "I’m your friendly chatbot companion! What's up?",
        "Just a bot, but always ready to listen.",
        "I'm all about helping! What do you need?",
        "I don't have a life story, but I’d love to hear yours!",
      ],
      informationRequests: [
        "Here’s what I found...",
        "Let me get that information for you!",
        "Good question! Here’s some info...",
        "Let’s dive into that topic!",
        "One moment, gathering data...",
        "I’ll look up the details for you.",
        "That’s a great question! Here’s what I know...",
        "Compiling the information for you!",
        "Let me fetch the data you need.",
        "Here’s what I’ve gathered on that.",
      ],
      recommendations: [
        "I recommend giving it a try!",
        "Based on what I know, this could be a great choice!",
        "How about trying this?",
        "Maybe this would work for you!",
        "Here’s a suggestion!",
        "You might like this idea.",
        "This could be an interesting option!",
        "Consider giving this a go!",
        "Here’s a potential choice for you.",
        "Why not explore this option?",
      ],
      acknowledgments: [
        "You're welcome!",
        "Glad to be of help!",
        "Happy to assist!",
        "Anytime!",
        "My pleasure!",
        "I'm here to help whenever you need!",
        "You got it!",
        "Glad I could be of service!",
        "It’s what I’m here for!",
        "Anytime you need assistance, I’m here.",
      ],
      jokes: [
        "Why did the JavaScript developer go broke? Because he couldn’t 'callback' his function!",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "I would tell you a UDP joke, but I’m not sure you’d get it.",
        "Why was the developer so broke? Because he used up all his cache!",
        "Why did the Python developer break up with the Java developer? They just weren’t 'compatible!'",
        "How many developers does it take to change a light bulb? None. It’s a hardware problem!",
        "Why do functions break up? Because they have constant arguments!",
        "Why did the array break up with the stack? It found someone with more depth.",
        "Why don’t developers tell secrets in public? They can’t find a private variable!",
        "Why was the function so cool? Because it always returned something!",
      ],
      motivationalQuotes: [
        "Keep pushing forward, you’re doing great!",
        "Believe in yourself! You’ve got this.",
        "Success is just a few lines of code away!",
        "Never stop learning – the journey is worth it!",
        "Stay positive, stay coding!",
        "Small steps lead to big achievements!",
        "Focus on progress, not perfection!",
        "Dream big, code bigger!",
        "You’re capable of amazing things!",
        "Keep coding, and keep growing!",
      ],
      weather: [
        "I wish I could see the sky! Why not check your local weather app?",
        "I'm not equipped with real-time data, but it’s always a good idea to stay prepared!",
        "Check outside the window for the most accurate forecast!",
        "I’d suggest grabbing an umbrella just in case!",
        "Looks like I’m not connected to the weather network!",
        "Wish I could forecast the weather, but I’m all clear skies here!",
        "Check a weather app for the latest update!",
        "Stay prepared, weather is full of surprises!",
        "Hope it’s sunny wherever you are!",
        "I’m sending sunny vibes your way!",
      ],
      goodbye: [
        "Goodbye! Have a great day!",
        "See you soon!",
        "Take care! Talk to you later!",
        "Bye! Hope to see you again!",
        "Catch you later!",
        "Stay safe, and goodbye for now!",
        "Looking forward to our next chat!",
        "Goodbye, and happy coding!",
        "Stay awesome! Bye!",
        "Farewell for now!",
      ],
      fallback: [
        "I'm not sure how to respond to that. Can you please rephrase?",
        "Could you clarify your question?",
        "I didn’t understand that. Could you try asking again?",
        "Hmm, I’m not sure. Could you try asking differently?",
        "I’m not certain, but let’s try again!",
        "I didn’t catch that, could you explain?",
        "Not sure I got that, let’s try a different question.",
        "Could you elaborate on that?",
        "I'm here to help, so feel free to rephrase!",
        "A little lost here! Could you say it another way?",
      ],
      funFacts: [
        "Did you know? JavaScript was created in just 10 days!",
        "CSS was first proposed in 1994 by Håkon Wium Lie.",
        "HTML stands for HyperText Markup Language.",
        "The first website ever created is still online at CERN's website.",
        "Python is named after the comedy group Monty Python.",
        "Git was created by Linus Torvalds, the same person who created Linux.",
        "JavaScript was initially called Mocha, then LiveScript, before becoming JavaScript.",
        "The first emoji was created in 1999 by Shigetaka Kurita.",
        "The @ symbol was chosen for email addresses by Ray Tomlinson in 1971.",
        "JavaScript and Java are completely different languages!",
      ],
      techInsights: [
        "JavaScript is single-threaded, but with async operations, it can handle multiple tasks.",
        "React’s virtual DOM enhances performance by reducing real DOM updates.",
        "TypeScript helps catch errors early, making code more maintainable.",
        "Next.js provides server-side rendering, improving SEO and performance.",
        "Functional programming encourages using pure functions, which have no side effects.",
        "API design patterns like REST and GraphQL shape data fetching in applications.",
        "With NestJS, developers can use TypeScript in Node.js for scalable backend development.",
        "Tailwind CSS is a utility-first framework that reduces the need for custom styles.",
        "Git branching strategies like Git Flow help manage large projects effectively.",
        "Headless CMSs like Strapi decouple content from the frontend for flexibility.",
      ],
      trivia: [
        "Q: Which programming language is known as the language of the web? A: JavaScript.",
        "Q: What does CSS stand for? A: Cascading Style Sheets.",
        "Q: Who created the Linux operating system? A: Linus Torvalds.",
        "Q: What was JavaScript initially called? A: Mocha.",
        "Q: In what year was the first version of HTML introduced? A: 1993.",
        "Q: Who is known as the father of computing? A: Charles Babbage.",
        "Q: How many bits are there in a byte? A: 8 bits.",
        "Q: Who invented the World Wide Web? A: Tim Berners-Lee.",
        "Q: In coding, what does DRY stand for? A: Don't Repeat Yourself.",
        "Q: Which symbol is commonly used to comment code in JavaScript? A: //",
      ],
      proTips: [
        "Use keyboard shortcuts to speed up coding. CTRL + D duplicates a line in many editors!",
        "Use Git branches to experiment without affecting your main codebase.",
        "Take breaks when coding to keep your mind fresh and productive.",
        "Keep functions focused on one task for easier debugging and maintenance.",
        "Organize your project folders for efficient file management.",
        "Document your code to make it understandable for others (and your future self)!",
        "Version control is a lifesaver for tracking changes in your projects.",
        "Use linting tools like ESLint to enforce code quality.",
        "Write tests for your code to catch errors before deployment.",
        "Refactor code regularly to improve readability and performance.",
      ],
      successStories: [
        "Here's an inspiring story: A developer once started by building small projects, and now they’re managing a large tech team!",
        "I love hearing success stories! A fellow coder landed their dream job by contributing to open-source projects.",
        "A small startup grew into a billion-dollar company by sticking to their core values and adapting to user needs.",
        "Did you know? One of the most successful apps started out as a hobby project in a college dorm!",
        "From failure to success: A developer created a new feature after their original app was rejected by investors!",
      ],
      advice: [
        "Don’t fear failure—each mistake is a step towards success!",
        "In coding, persistence is key. If you hit a roadblock, keep trying different approaches.",
        "Always write clean, readable code—it’ll save you hours in debugging later.",
        "Remember to test early and often. Catching bugs early saves you time in the long run!",
        "Pair programming can be a great way to learn new techniques and collaborate on solving problems.",
      ],
      productivityTips: [
        "Use the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break.",
        "Keep your workspace organized for better focus and productivity.",
        "Eliminate distractions by using apps like Focus@Will or Forest to stay focused.",
        "Set achievable goals for each work session to maintain a sense of accomplishment.",
        "Don’t be afraid to delegate tasks when you’re overwhelmed.",
      ],
      codingChallenges: [
        "Have you tried solving algorithm challenges on platforms like LeetCode or Codewars?",
        "Sometimes the hardest bugs can lead to the most rewarding solutions. Take a step back and approach it fresh!",
        "Try building a small app or tool to solve a problem in your daily life. It’s a great way to practice!",
        "Challenge yourself by learning a new programming language or framework every year.",
        "Code reviews are a fantastic way to improve your skills. Get feedback and give feedback to others.",
      ],
      funAndGames: [
        "Want to play a game? Try guessing a programming language based on hints I give you!",
        "Here’s a challenge: Can you find the hidden bug in this snippet of code?",
        "Let’s play a quick game! I’ll give you a riddle and you try to guess the answer.",
        "I’ve got a puzzle for you! What comes once in a minute, twice in a moment, but never in a thousand years?",
        "Let’s play a trivia game! What’s the only programming language named after a snake?",
      ],
      techNews: [
        "Did you hear? There’s a new version of TypeScript out with even more powerful features!",
        "The latest framework craze is something called Svelte—it's gaining traction quickly!",
        "AI is making waves in coding with tools like GitHub Copilot helping developers be more efficient!",
        "A new study shows that JavaScript remains the most popular programming language for web development.",
        "Cloud computing services are making development faster and easier than ever before!",
      ],
      quotesAndWisdom: [
        "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
        "“Talk is cheap. Show me the code.” – Linus Torvalds",
        "“The only way to do great work is to love what you do.” – Steve Jobs",
        "“In programming, the most important skill is not coding, but the ability to solve problems.” – Unknown",
        "“Simplicity is the soul of efficiency.” – Austin Freeman",
      ],
      debuggingTips: [
        "When debugging, always check for simple mistakes first, like missing semicolons or typos.",
        "Use console logs to trace values and check the flow of your code.",
        "If you're stuck, try explaining the problem to someone else. Sometimes the solution becomes clear.",
        "Break your problem down into smaller parts and tackle them one at a time.",
        "Don’t be afraid to ask for help from the coding community. Debugging is a shared experience!",
      ],
      toolsAndResources: [
        "Check out Visual Studio Code—it’s one of the most popular code editors with tons of extensions.",
        "Try using Postman for testing your APIs. It’s incredibly user-friendly!",
        "GitHub is great for hosting your code and collaborating with others on open-source projects.",
        "Stack Overflow is an invaluable resource when you’re stuck. You’ll find answers to nearly every coding problem!",
        "Consider using Figma for designing UIs—its collaboration features make it a great tool for teams.",
      ],
      lifeHacks: [
        "Organize your tasks using the Eisenhower Matrix: prioritize important tasks and delegate or eliminate the rest.",
        "Use keyboard shortcuts for everything. It saves time and keeps your hands on the keyboard!",
        "Set daily, weekly, and monthly goals to break down big projects into manageable steps.",
        "Take care of your mental health—coding long hours can be draining. Exercise, meditate, or just take breaks.",
        "Keep a to-do list. Writing down tasks helps you stay organized and reduces mental clutter.",
      ],
      userFeedback: [
        "Your feedback is important to me. How can I improve my responses?",
        "I strive to improve with every conversation. Feel free to tell me what you think!",
        "I love hearing from users! What can I do better next time?",
        "How’s your experience been so far? Let me know if there’s anything I can do for you!",
        "Your input is valuable. Help me make this interaction better for you!",
      ],
      codingQuotes: [
        "“Programs must be written for people to read, and only incidentally for machines to execute.” – Harold Abelson",
        "“Good code is its own best documentation.” – Steve McConnell",
        "“The best way to predict the future is to invent it.” – Alan Kay",
        "“First, solve the problem. Then, write the code.” – John Johnson",
        "“The computer was born to solve problems that did not exist before.” – Bill Gates",
      ],
      codingMyths: [
        "Myth: You need to be good at math to be a great programmer. Reality: Programming is more about problem-solving.",
        "Myth: You need to know everything about a language to use it effectively. Reality: Focus on solving problems with the tools you have.",
        "Myth: Coding is all about memorization. Reality: It’s about understanding concepts and knowing how to use resources.",
        "Myth: Frontend development is easier than backend development. Reality: Both have their challenges and are equally important.",
        "Myth: Only full-stack developers are in demand. Reality: Specializing in a specific area can make you a highly valued expert.",
      ],
      codingResources: [
        "Check out MDN Web Docs for in-depth tutorials on JavaScript and web technologies.",
        "FreeCodeCamp offers an excellent interactive learning experience for beginners and advanced developers.",
        "W3Schools is a great resource for quickly checking syntax and examples for various web technologies.",
        "If you’re looking for a coding challenge, HackerRank and LeetCode have a variety of problems to solve.",
        "Codecademy is a great platform for learning new programming languages and frameworks interactively.",
      ],
      productivityHacks: [
        "Batch similar tasks together to stay focused and improve productivity.",
        "Use the 2-Minute Rule: if something takes less than 2 minutes, do it right away.",
        "Turn off notifications during coding sessions to stay focused.",
        "Start your day with the hardest task first—this is known as the ‘Eat That Frog’ method.",
        "Use the 80/20 rule (Pareto Principle)—focus on the 20% of tasks that bring 80% of the results.",
      ],
      devConfessions: [
        "I once spent an hour debugging only to realize I forgot to save my file!",
        "I’ve accidentally committed sensitive information to GitHub more times than I’d like to admit.",
        "I sometimes forget to add comments and then regret it later when I need to revisit the code.",
        "There’s a small part of my code that I’ve been meaning to clean up for months… but it works!",
        "Sometimes, I feel like a stackoverflow bot more than a developer.",
      ],
      funProgrammingFacts: [
        "Did you know that the first computer bug was a real moth found inside a Harvard Mark II computer?",
        "The name 'Java' comes from Java coffee, which was named after the Indonesian island of Java.",
        "The first website was launched in 1991 by Tim Berners-Lee and it’s still online!",
        "There are more mobile phones in the world than there are computers, and that's why mobile-first design is essential.",
        "The word 'debugging' originated when Grace Hopper removed an actual moth from a computer in 1947.",
      ],
      startupAdvice: [
        "Fail fast, but learn faster. Every failure teaches you something valuable.",
        "A great startup idea solves a real-world problem. Focus on value over just features.",
        "Don’t be afraid to pivot if something isn’t working. Flexibility is key in a startup’s success.",
        "Networking and building relationships is just as important as the product itself.",
        "Customer feedback is invaluable. It’s the best way to ensure your startup stays relevant.",
      ],
      techChallenges: [
        "Building scalable systems while maintaining performance is always a fun challenge.",
        "One of the toughest problems in tech is ensuring security and privacy while providing functionality.",
        "Writing test-driven code can be hard at first, but it really pays off in long-term project stability.",
        "Optimizing code for performance while keeping it readable is a constant balancing act.",
        "Handling concurrency in a multi-threaded environment can be tricky, but it’s essential for performance.",
      ],
      techTrivia: [
        "Did you know? The first computer programmer was Ada Lovelace, who wrote an algorithm for Charles Babbage’s Analytical Engine.",
        "In 1983, the first version of Microsoft Word was released for MS-DOS!",
        "The term 'debugging' came from the days of mechanical computers, where bugs (insects) would physically get stuck in the machine.",
        "Python was named after the British comedy group Monty Python, not the snake!",
        "The first video game was created in 1958 by William Higinbotham, called ‘Tennis for Two’.",
      ],
      webDesignTips: [
        "Use consistent design patterns across your site to improve user experience.",
        "Ensure your website is mobile-first and responsive to accommodate all devices.",
        "White space is your friend—it helps your design feel clean and organized.",
        "Typography plays a huge role in readability. Don’t use too many fonts on one page.",
        "Optimize your images for faster load times without sacrificing quality.",
      ],
      careerAdvice: [
        "Never stop learning. The tech industry evolves quickly, and staying current is key.",
        "Network with other developers—sometimes opportunities come from the people you know.",
        "Don’t hesitate to ask for help when you need it. Even experienced developers face challenges.",
        "Focus on quality over quantity. It’s better to have a few well-built projects than many unfinished ones.",
        "Build a strong portfolio that showcases your best work. It’s your personal brand.",
      ],
      collaborationTips: [
        "Clear communication is key in team projects. Make sure everyone is on the same page.",
        "Version control systems like Git are essential for collaborative coding. Use branches to manage tasks.",
        "Respect different coding styles. Consistency in code is more important than perfection.",
        "Be open to code reviews. They’re a great opportunity for learning and improving.",
        "Use project management tools like Trello or Jira to keep track of tasks and deadlines.",
      ],
      designThinking: [
        "Start with empathy. Understand the problem you’re trying to solve from the user’s perspective.",
        "Always prototype before building. It saves time and helps you test ideas quickly.",
        "User feedback is invaluable—test your designs early and often with real users.",
        "Consider the user journey. Design should be seamless and intuitive from start to finish.",
        "Don’t fall in love with your first idea—iterate and improve upon it based on testing.",
      ],
      codingHumor: [
        "Why do Java developers wear glasses? Because they can’t C#!",
        "Why was the JavaScript developer sad? Because he didn’t 'null' his feelings.",
        "To understand recursion, you must first understand recursion.",
        "I used to be a developer, but then I became a full-time bug-fixer.",
        "My code doesn’t work, I have no idea why. But it does. Sometimes. Eventually.",
      ],
      inspirationalTechStories: [
        "Elon Musk started Tesla and SpaceX with huge challenges, but his drive and vision led to success.",
        "Mark Zuckerberg started Facebook in his dorm room—now it’s one of the largest companies in the world.",
        "The founders of WhatsApp built it as a simple app, now it connects billions of people globally.",
        "Steve Jobs was fired from Apple, the company he founded, but he returned years later and revolutionized the tech world again.",
        "Linus Torvalds created Linux and the Git version control system, both of which are critical to modern computing.",
      ],
      codingBestPractices: [
        "Keep your functions small and focused on one task. It makes them easier to test and debug.",
        "Use meaningful variable names to make your code more readable.",
        "Don’t repeat yourself (DRY principle). Reuse code as much as possible to reduce redundancy.",
        "Write unit tests to ensure your code works as expected and to catch regressions.",
        "Document your code with comments so others (and your future self) can understand it.",
      ],
      debuggingFails: [
        "I once spent an entire day debugging only to realize the issue was a misplaced semicolon.",
        "The longest debugging session I’ve ever had was figuring out why a variable wouldn’t update—it was a scope issue!",
        "I spent hours troubleshooting a bug only to discover it was caused by a simple typo in the variable name.",
        "The most frustrating bug I encountered was an off-by-one error in a loop that took forever to find.",
        "A hidden bug in my code turned out to be a missing return statement in a function.",
      ],
    };

    // Helper function to pick a random response from a category
    const getRandomResponse = (responses: string[]): string => {
      return responses[Math.floor(Math.random() * responses.length)];
    };

    // Matching input to response categories
    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey")
    ) {
      return getRandomResponse(responseMap.greetings);
    } else if (
      lowerInput.includes("how are you") ||
      lowerInput.includes("who are you") ||
      lowerInput.includes("what are you")
    ) {
      return getRandomResponse(responseMap.personalQuestions);
    } else if (
      lowerInput.includes("how’s it going") ||
      lowerInput.includes("what’s up")
    ) {
      return getRandomResponse(responseMap.smallTalk);
    } else if (
      lowerInput.includes("tell me about") ||
      lowerInput.includes("what is") ||
      lowerInput.includes("info on")
    ) {
      return getRandomResponse(responseMap.informationRequests);
    } else if (
      lowerInput.includes("suggest") ||
      lowerInput.includes("recommend")
    ) {
      return getRandomResponse(responseMap.recommendations);
    } else if (
      lowerInput.includes("thank you") ||
      lowerInput.includes("thanks")
    ) {
      return getRandomResponse(responseMap.acknowledgments);
    } else if (lowerInput.includes("joke") || lowerInput.includes("funny")) {
      return getRandomResponse(responseMap.jokes);
    } else if (
      lowerInput.includes("motivate") ||
      lowerInput.includes("inspire") ||
      lowerInput.includes("quote")
    ) {
      return getRandomResponse(responseMap.motivationalQuotes);
    } else if (lowerInput.includes("weather")) {
      return getRandomResponse(responseMap.weather);
    } else if (
      lowerInput.includes("bye") ||
      lowerInput.includes("goodbye") ||
      lowerInput.includes("see you")
    ) {
      return getRandomResponse(responseMap.goodbye);
    } else if (
      lowerInput.includes("resources") ||
      lowerInput.includes("where can I learn") ||
      lowerInput.includes("tutorials")
    ) {
      return getRandomResponse(responseMap.codingResources);
    } else if (
      lowerInput.includes("productivity") ||
      lowerInput.includes("hack") ||
      lowerInput.includes("efficiency")
    ) {
      return getRandomResponse(responseMap.productivityHacks);
    } else if (
      lowerInput.includes("confess") ||
      lowerInput.includes("mistake") ||
      lowerInput.includes("embarrassing")
    ) {
      return getRandomResponse(responseMap.devConfessions);
    } else if (
      lowerInput.includes("fact") ||
      lowerInput.includes("did you know")
    ) {
      return getRandomResponse(responseMap.funProgrammingFacts);
    } else if (
      lowerInput.includes("startup") ||
      lowerInput.includes("founder") ||
      lowerInput.includes("business")
    ) {
      return getRandomResponse(responseMap.startupAdvice);
    } else if (
      lowerInput.includes("challenge") ||
      lowerInput.includes("problem") ||
      lowerInput.includes("difficult")
    ) {
      return getRandomResponse(responseMap.techChallenges);
    } else if (
      lowerInput.includes("trivia") ||
      lowerInput.includes("quiz")
    ) {
      return getRandomResponse(responseMap.techTrivia);
    } else if (
      lowerInput.includes("design") ||
      lowerInput.includes("user interface") ||
      lowerInput.includes("web design")
    ) {
      return getRandomResponse(responseMap.webDesignTips);
    } else if (
      lowerInput.includes("career") ||
      lowerInput.includes("job") ||
      lowerInput.includes("work advice")
    ) {
      return getRandomResponse(responseMap.careerAdvice);
    } else if (
      lowerInput.includes("collaborate") ||
      lowerInput.includes("teamwork") ||
      lowerInput.includes("group")
    ) {
      return getRandomResponse(responseMap.collaborationTips);
    } else if (
      lowerInput.includes("thinking") ||
      lowerInput.includes("approach") ||
      lowerInput.includes("strategy")
    ) {
      return getRandomResponse(responseMap.designThinking);
    } else if (
      lowerInput.includes("humor") ||
      lowerInput.includes("laugh") ||
      lowerInput.includes("funny coding")
    ) {
      return getRandomResponse(responseMap.codingHumor);
    } else if (
      lowerInput.includes("story") ||
      lowerInput.includes("inspirational") ||
      lowerInput.includes("tech story")
    ) {
      return getRandomResponse(responseMap.inspirationalTechStories);
    } else if (
      lowerInput.includes("best practices") ||
      lowerInput.includes("coding standards")
    ) {
      return getRandomResponse(responseMap.codingBestPractices);
    } else if (
      lowerInput.includes("debugging") ||
      lowerInput.includes("bug") ||
      lowerInput.includes("error")
    ) {
      return getRandomResponse(responseMap.debuggingFails);
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
