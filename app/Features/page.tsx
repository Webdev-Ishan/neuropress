"use client";
import SkiperCardDemo from "@/components/Skiper";
import React, { useEffect } from "react";
import { BookOpen, Zap, Share2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>(".section").forEach((sec) => {
      gsap.from(sec, {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec, // 👈 animate this section only
          start: "top 100%", // when it enters viewport
          toggleActions: "play none none none",
        },
      });
    });

    gsap.from(".box1", {
      opacity: 0,
      x: -50,
      duration: 4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".box1", // 👈 animate this section only
        start: "top 100%", // when it enters viewport
        toggleActions: "play none none none",
      },
    });

    gsap.from(".lastbox", {
      opacity: 0,
      duration: 1.5,
      scale: 0, // start as a dot
      rotate: 360, // rotate while growing
      ease: "power3.out",
      transformOrigin: "center center", // ensures scaling happens from center
      scrollTrigger: {
        trigger: ".lastbox",
        start: "top 100%",
        toggleActions: "play none none none",
      },
    });
  }, []);
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-6xl">
        {/* Hero Section */}
        <section className="rounded-2xl p-6 md:p-12 flex flex-col items-center section">
          <h1 className="text-3xl md:text-6xl font-bold text-center text-black mb-12">
            WELCOME TO <span className="text-red-700">NEUROPRESS</span>
          </h1>

          <p className="text-base font-sans md:text-lg text-black text-center max-w-2xl mb-10">
            Explore features, learn interactively, and experience a smooth
            learning environment.
          </p>

          {/* Full width Skiper */}
          <div className="w-full">
            <SkiperCardDemo />
          </div>
        </section>

        <section className="py-12 px-4 sm:px-8 md:px-16 flex flex-col-reverse md:flex-row items-center section">
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 box1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-700 mb-4">
              Share Your Ideas, Reach the World
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl md:text-lg lg:text-xl max-w-lg">
              NeuroPress lets you write, organize, and explore blogs
              effortlessly. Create content, connect with readers, and keep your
              stories alive.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image
              src="/Features3.svg"
              width={50}
              height={50}
              alt="Tailwind CSS Components"
              className="w-full h-full max-w-md rounded-4xl text-red-500 cursor-pointer"
            />
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 section">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition lastbox">
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-black mb-2">
              Smart Learning
            </h2>
            <p className="text-gray-700">
              Read blogs powered with interactive visuals, concise summaries,
              and AI-driven recommendations to boost your knowledge.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition lastbox">
            <Zap className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-black mb-2">
              Fast & Modern
            </h2>
            <p className="text-gray-700">
              Optimized for speed with Next.js, ensuring seamless browsing,
              instant loading, and smooth navigation.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition lastbox">
            <Share2 className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-black mb-2">
              Easy Sharing
            </h2>
            <p className="text-gray-700">
              Share your favorite posts instantly across social media and
              connect with other learners effortlessly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition lastbox">
            <ShieldCheck className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold text-black mb-2">
              Secure & Reliable
            </h2>
            <p className="text-gray-700">
              Built with modern security standards, your data and reading
              preferences are always safe.
            </p>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="mt-24 text-center section">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Start Your Journey with{" "}
            <span className="text-red-700">NeuroPress</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join a community of learners and experience the future of blogging.
          </p>
          <button
            onClick={() => router.push("/Register")}
            className="px-6 py-3 bg-red-700 text-white rounded-full shadow-md hover:bg-red-800 transition"
          >
            Get Started
          </button>
        </section>
      </div>
    </main>
  );
}
