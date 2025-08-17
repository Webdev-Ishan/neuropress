"use client";

import { useRouter } from "next/navigation";
import FlipLink from "../components/ui/text-effect-flipper";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { TextScroll } from "@/components/ui/text-scroll";
import MarkedDiv from "@/components/markeddiv";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6 flex-1">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-red-700 mb-4">
          <FlipLink href="https://github.com/Webdev-Ishan">NeuroPress</FlipLink>
        </h1>

        {/* Github Section */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <FlipLink href="" >
            Github
          </FlipLink>
          <Image
            src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
            alt="GitHub Logo"
            width={40}
            height={40}
            unoptimized
            priority
            className="w-10 h-10 md:w-12 md:h-12 object-contain border border-gray-200 rounded-xl cursor-pointer hover:shadow-md hover:border-red-600 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your personal hub for creating, sharing, and exploring ideas. Write
          freely, connect with readers, and keep your stories alive.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => router.push("/Register")}
            className="bg-red-700 text-white px-6 md:px-8 py-3 rounded-lg flex items-center gap-2 text-base font-medium transition hover:bg-red-800 shadow-sm"
          >
            Get Started <MoveRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push("/About")}
            className="border border-red-700 text-red-700 px-6 md:px-8 py-3 rounded-lg text-base font-medium transition hover:bg-red-50"
          >
            Learn More
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-16 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-red-700 mb-4">
            Share Your Ideas, Reach the World
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            NeuroPress lets you write, organize, and explore blogs effortlessly.
            Create content, connect with readers, and keep your stories alive.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button
              onClick={() => router.push("/Register")}
              className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition font-semibold shadow-sm"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/About")}
              className="border border-red-700 text-red-700 px-6 py-3 rounded-lg hover:bg-red-50 transition font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            width={400}
            height={400}
            alt="Illustration"
            className="w-full max-w-md h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-red-700">Featured Highlights</h1>
          <Image
            src="https://www.svgrepo.com/show/486695/highlight.svg"
            alt="Highlight Icon"
            width={48}
            height={48}
            unoptimized
            priority
            className="w-12 h-12 bg-red-600 text-white rounded-xl border border-red-700 p-2"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <MarkedDiv />
        </div>
      </section>

      {/* Scrolling Text Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 max-w-3xl mx-auto mb-8 leading-snug">
          Create and Find the Best Blogs in the World
        </h1>

        <TextScroll
          className="font-display text-center text-3xl md:text-5xl font-extrabold text-red-700 tracking-tight mb-8"
          text="NeuroPress • NeuroPress • NeuroPress • NeuroPress"
          default_velocity={4}
        />

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover, share, and enjoy a world of blogs. Stay inspired and never
          miss out on amazing content curated just for you.
        </p>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Why choose NeuroPress?
        </h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 cursor-pointer bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Minimal Writing</h3>
            <p className="text-gray-600 text-base">
              A distraction-free editor designed to keep your focus on words.
            </p>
          </div>
          <div className="p-6 cursor-pointer bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Reach Readers</h3>
            <p className="text-gray-600 text-base">
              Share your blogs, build an audience, and inspire with your ideas.
            </p>
          </div>
          <div className="p-6 cursor-pointer bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Stay Organized</h3>
            <p className="text-gray-600 text-base">
              Keep your blogs structured and easy to explore for your readers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

