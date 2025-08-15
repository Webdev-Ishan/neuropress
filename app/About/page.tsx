"use client";
import Carousal from "@/components/Carousal";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About MindVault</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Your second brain for capturing, organizing, and recalling everything
          important. MindVault is designed to help you think smarter, work
          faster, and never forget a single idea.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-blue-500 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          We believe that knowledge is the most valuable asset a person can
          have. MindVault empowers you to store and retrieve information
          effortlessly, enabling you to focus on creativity and problem-solving
          rather than remembering every detail.
        </p>
      </section>

      {/* Features Overview */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Capture Ideas Instantly
            </h3>
            <p className="text-gray-600">
              Save notes, tasks, and inspirations in seconds so you can focus on
              the moment.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Organize Without Effort
            </h3>
            <p className="text-gray-600">
              Use tags, folders, and smart search to keep everything exactly
              where you need it.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Recall Anything, Anytime
            </h3>
            <p className="text-gray-600">
              Find what you need in seconds with lightning-fast search and smart
              suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-6">
            Benefits of Using{" "}
            <span className=" text-red-500">NeuroPress</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mt-6">
            Unlock your creative potential and streamline your blogging
            experience with our intuitive, AI-powered platform designed for
            writers and creators.
          </p>

          {/* Carousel */}
          <div className="w-full">
            <Carousal />
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="bg-blue-500 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="mb-6">
          Join MindVault today and start building your second brain.
        </p>
        <button
          onClick={() => router.push("/register")}
          className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
