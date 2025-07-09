"use client";

import { useEffect, useState } from "react";

export default function Spinner() {
  const loadingMessagesArr = [
    "AI is analyzing your resume...",
    "AI is scanning the job description...",
    "Generating your tailored email...",
    "Preparing your message for impact...",
    "Crafting brilliance behind the scenes...",
    "Personalizing content for you...",
    "Highlighting your strengths...",
    "Optimizing for maximum effect...",
    "Almost ready to impress...",
    "Ensuring perfect clarity...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessagesArr.length);
    }, 4700);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col gap-8">
        <div className="flex justify-center items-center py-12">
          <div className="relative w-16 h-16">
            {/* Outer glowing pulse ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-30 animate-ping" />

            {/* Inner glowing core with pulse */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 shadow-[0_0_40px_#2563eb] animate-pulse" />
          </div>
        </div>
        <h1 className="text-lg text-center">{loadingMessagesArr[index]}</h1>
      </div>
    </>
  );
}
