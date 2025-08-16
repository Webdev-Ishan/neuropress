"use client";

import React, { useState } from "react";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";

export default function ProfilePage() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const blogs = [
    {
      id: 1,
      src: "/Features2.jpg",
      title: "Getting Started with NeuroPress",
      content: "Intro blog content...",
    },
    {
      id: 2,
      src: "/Features2.jpg",
      title: "Mastering AI Integration",
      content: "Another blog content...",
    },
    {
      id: 3,
      src: "/Features2.jpg",
      title: "Next.js Tips and Tricks",
      content: "Some blog content...",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Section */}
        <section className="bg-red-50 mt-12 shadow-lg rounded-2xl p-8 flex flex-col items-center ">
          <div className="w-24 h-24 rounded-full bg-red-700 text-white flex items-center justify-center text-3xl font-bold mb-4">
            {username.charAt(0)}
          </div>
          <h2 className="text-5xl font-bold text-red-700 mb-1">{username}</h2>
          <p className="text-gray-700">{email}</p>
        </section>

        {/* Blogs Section */}
        <section>
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">
            <span className="text-red-700 text-3xl">Your</span> Blogs
          </h3>

          <div className="space-y-6">
            <div className="w-full flex flex-wrap justify-center items-center gap-6 px-4">
              {blogs.map((card) => (
                <MinimalCard
                  key={card.id}
                  className="w-full cursor-pointer sm:w-[90%] md:w-[380px] lg:w-[420px] xl:w-[480px] shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <MinimalCardImage
                    className="h-60 md:h-72 lg:h-80 object-cover rounded-t-lg"
                    src={card.src}
                    alt={card.title}
                  />
                  <MinimalCardTitle className="text-lg text-red-700 font-semibold mt-4">
                    {card.title}
                  </MinimalCardTitle>
                </MinimalCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
