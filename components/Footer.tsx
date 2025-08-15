"use client";


import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h1 className="text-2xl font-bold text-red-700">NeuroPress</h1>
            <p className="max-w-sm text-gray-600">
              Your personal hub for creating, sharing, and exploring ideas. Stay
              productive and never lose an idea again.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-12 justify-center">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-red-700">Company</h2>
              <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
              <Link href="/About" className="hover:text-red-700 transition-colors">About</Link>
              <Link href="/Pricing" className="hover:text-red-700 transition-colors">Pricing</Link>
              <Link href="/Contact" className="hover:text-red-700 transition-colors">Contact</Link>
            </div>
            <div className="md:flex flex-col hidden  gap-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-red-700">Resources</h2>
              <Link href="/Blog" className="hover:text-red-700 transition-colors">Blog</Link>
              <Link href="/Help" className="hover:text-red-700 transition-colors">Help Center</Link>
              <Link href="/Privacy" className="hover:text-red-700 transition-colors">Privacy Policy</Link>
              <Link href="/Terms" className="hover:text-red-700 transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h2 className="text-lg font-semibold text-red-700">Follow Us</h2>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-700 hover:text-red-700 transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-red-700 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-red-700 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-red-700 transition-colors">
                <Github className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} NeuroPress. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
