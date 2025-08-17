"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Notebook, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", path: "/Features" },
    { name: "Profile", path: "/Profile" },
    { name: "About", path: "/About" },
    { name: "Explore", path: "/Explore" },
    { name: "CreateBlog", path: "/CreateBlog" },
  ];

  return (
    <nav className="fixed w-full z-50  bg-white  backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Notebook className="w-7 h-7 text-red-700" />
          <span className="text-2xl font-bold text-black ">NeuroPress</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => router.push(link.path)}
              className="text-black hover:text-red-700 font-semibold cursor-pointer transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push("/Signin")}
          className="bg-red-700 hidden md:block text-white px-6 py-2 rounded-lg cursor-pointer hover:shadow-sm hover:shadow-red-700 transition-all duration-300"
        >
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all cursor-pointer duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-4 bg-gray-50">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-black hover:text-blue-700 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/Signin"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-red-text-red-700 text-white text-center px-4 py-2 rounded-lg hover:shadow-md hover:shadow-blue-600 transition-all duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
