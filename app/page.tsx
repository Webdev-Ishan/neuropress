"use client";
import { useRouter } from "next/navigation";
import FlipLink from "../components/ui/text-effect-flipper";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-red-50 min-h-screen flex flex-col">
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-white to-blue-50 flex-1">
        <h1 className="text-4xl md:text-6xl mb-4 font-bold text-red-700">
          <FlipLink href="">NeuroPress</FlipLink>
        </h1>
        <h1 className="text-4xl md:text-6xl mb-4 font-bold text-red-700">
          <span className="flex items-center gap-2">
            <FlipLink href="">Github</FlipLink>
            <Image
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              alt="GitHub Logo"
              width={80}
              height={80}
              unoptimized
              priority
               className="w-20 h-20 object-contain border border-white rounded-2xl cursor-pointer hover:shadow-lg hover:border-red-700 hover:text-red-700 transition-all duration-300"
            />
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Your personal hub for creating, sharing, and exploring ideas. Write
          freely, connect with readers, and keep your stories alive.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <span className="flex justify-center items-center gap-2">
            <div
              onClick={() => router.push("/register")}
              className="bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 cursor-pointer hover:text-black"
            >
              <span>Get Started</span>
              <MoveRight />
            </div>
          </span>

          <div
            onClick={() => router.push("/About")}
            className="border border-red-700 text-black cursor-pointer px-6 py-3 rounded-lg hover:bg-red-200"
          >
            Learn More
          </div>
        </div>
      </header>
    </div>
  );
}
