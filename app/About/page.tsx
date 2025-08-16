"use client";
import Carousal from "@/components/Carousal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-black py-20 px-6 text-center">
        <h1 className="text-6xl font-sans font-bold mb-4">
          LEARN MORE <br />
          ABOUT<span className="text-red-700"> NEUROPRESS</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg mt-8 font-sans text-gray-700">
          Our Platform, Blogs, Community and More.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 max-w-5xl flex justify-center items-center mx-auto text-center">
        <Image
          src="/About.jpg"
          alt="Highlight Icon"
          width={50}
          height={50}
          unoptimized
          priority
          className="w-full h-full  text-white border bg-red-600  object-contain border-black  rounded-2xl cursor-pointer hover:shadow-lg hover:border-white transition-all duration-300"
        />
      </section>

      {/* Features Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          {/* Text */}
          <h1 className="font-bold font-sans text-2xl md:text-3xl lg:text-4xl max-w-lg">
            NeuroPress is a Blog Platform which helps the content writers around
            the Globe to connect and spread their knowledge.
          </h1>

          {/* Image */}
          <Image
            src="/About2.jpg"
            alt="Highlight Icon"
            width={500}
            height={500}
            unoptimized
            priority
            className="w-full md:w-1/2 h-auto object-contain rounded-2xl cursor-pointer  transition-all duration-300"
          />
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col  items-center justify-center gap-8 text-center md:text-left">
          {/* Text */}
          <h1 className="font-bold font-sans text-6xl max-w-lg">
            OUR <span className="text-red-700">MISSION</span>
          </h1>
          <p className="text-gray-700 text-base font-sans sm:text-lg text-center max-w-2xl mt-6">
            At NeuroPress, our mission is to empower writers, creators, and
            thinkers from all corners of the world by giving them a platform to
            share their ideas freely and effectively. We aim to break down
            barriers to knowledge sharing, foster meaningful connections, and
            create a space where voices of all kinds can be heard. By combining
            simplicity with innovation, we help content writers amplify their
            reach and inspire global conversations that matter.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl font-sans sm:text-4xl md:text-5xl font-extrabold text-black mb-6">
            Benefits of Using <span className="text-red-700 ">NeuroPress</span>
          </h1>

          <p className="text-gray-700 text-base font-sans sm:text-lg max-w-2xl mt-6">
            Unlock your creative potential and streamline your blogging
            experience with our intuitive, AI-powered platform designed for
            writers and creators.
          </p>

          <div className="w-full mt-8">
            <Carousal />
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-12 px-6 text-center ">
        <h2 className="text-2xl font-semibold font-sans mb-4 text-black">
          Ready to boost your productivity?
        </h2>
        <p className="mb-6 font-sans text-gray-700">
          Join MindVault today and start building your second brain.
        </p>
        <button
          onClick={() => router.push("/Register")}
          className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-400 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
