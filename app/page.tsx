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
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center py-16 sm:py-16 md:py-20 px-4 flex-1">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 font-bold text-red-700">
          <FlipLink href="https://github.com/Webdev-Ishan">NeuroPress</FlipLink>
        </h1>

        {/* Github Title & Icon */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 font-bold text-red-700">
          <span className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
            <FlipLink href="">Github</FlipLink>
            <Image
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              alt="GitHub Logo"
              width={50} // base size for mobile
              height={50}
              unoptimized
              priority
              className="w-10 sm:w-12 md:w-16 lg:w-20 h-auto object-contain border border-white rounded-2xl cursor-pointer hover:shadow-lg hover:border-red-700 transition-all duration-300"
            />
          </span>
        </h2>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
          Your personal hub for creating, sharing, and exploring ideas. Write
          freely, connect with readers, and keep your stories alive.
        </p>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center">
          <div
            onClick={() => router.push("/Register")}
            className="bg-red-700 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg flex items-center gap-1 sm:gap-2 md:gap-3 transition duration-300 cursor-pointer hover:text-black"
          >
            <span className="text-sm sm:text-base md:text-lg">Get Started</span>
            <MoveRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>

          <div
            onClick={() => router.push("/About")}
            className="border border-red-700 text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg cursor-pointer hover:bg-red-200 text-sm sm:text-base md:text-lg"
          >
            Learn More
          </div>
        </div>
      </header>
      <section className="py-12 px-4 sm:px-8 md:px-16 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Share Your Ideas, Reach the World
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl md:text-lg lg:text-xl max-w-lg">
            NeuroPress lets you write, organize, and explore blogs effortlessly.
            Create content, connect with readers, and keep your stories alive.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button
              onClick={() => router.push("/Register")}
              className="bg-red-700 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/About")}
              className="border cursor-pointer border-red-700 text-red-700 px-6 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right SVG Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            width={50}
            height={50}
            alt="Tailwind CSS Components"
            className="w-full h-auto max-w-md rounded-2xl text-red-500 cursor-pointer"
          />
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 px-4 text-center ">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-red-700 mb-4">
            Highlights
          </h1>
          <Image
            src="https://www.svgrepo.com/show/486695/highlight.svg"
            alt="Highlight Icon"
            width={50}
            height={50}
            unoptimized
            priority
            className="w-10 sm:w-12 md:w-16 text-white lg:w-20 bg-red-600 h-auto object-contain border border-red-700 rounded-2xl cursor-pointer hover:shadow-lg hover:border-white transition-all duration-300"
          />
        </div>

        {/* MarkedDiv Component */}
        <div className="max-w-4xl mx-auto">
          <MarkedDiv />
        </div>
      </section>

      {/* Scrolling Text Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 text-center">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold text-gray-700 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 leading-snug">
          Create and Find the Best Blogs in the World
        </h1>

        {/* Scrolling Highlight */}
        <TextScroll
          className="font-display text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 mt-4 font-bold tracking-tight text-red-700 md:leading-[4rem] lg:leading-[5rem]"
          text="NeuroPress • NeuroPress • NeuroPress • NeuroPress  "
          default_velocity={4}
        />

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-600 max-w-2xl mx-auto mt-8 sm:mt-6">
          Discover, share, and enjoy a world of blogs. Stay inspired and never
          miss out on amazing content curated just for you.
        </p>
      </section>
    </div>
  );
}
