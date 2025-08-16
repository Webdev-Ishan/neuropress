"use client";

import React, { useEffect, useState } from "react";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Blogresponse = {
  id: string;
  title: string;
  thumbnail: string;
};

type Blog = {
  success: boolean;
  blogs: Blogresponse[];
};

export default function ExplorePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blogresponse[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form reload
    try {
      const response = await axios.post<Blog>(
        "/api/search",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setFilteredBlogs(response.data.blogs);
      } else {
        setFilteredBlogs([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Signin");
    }
  }, [session, router, status]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 px-6 py-12">
      <div className="max-w-6xl mt-6 mx-auto space-y-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
          EXPLORE <span className="text-red-600">NEUROPRESS</span>
        </h1>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-2 w-full sm:w-96 mx-auto"
        >
          <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>

        {/* Results */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <MinimalCard
                key={blog.id}
                onClick={() => router.push(`/BlogPost/${blog.id}`)}
                className=" overflow-hidden border bg-gray-200 rounded-xl p-4  hover:border-red-700  transition duration-300"
              >
                <MinimalCardImage
                  className="h-44 w-full cursor-pointer object-cover"
                  src={blog.thumbnail}
                  alt={blog.title}
                />
                <MinimalCardTitle className=" cursor-pointer text-base font-medium text-red-600 transition">
                  {blog.title}
                </MinimalCardTitle>
              </MinimalCard>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No blogs found
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
