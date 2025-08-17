"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type backendresponse = {
  success: boolean;
  message: string;
  blog?: {
    title: string;
    thumbnail: string;
    content: string;
  };
};

export default function CreateBlog() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const params = useParams();
  const { blogId } = params;

  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [thumbnail, setthumbnail] = useState("");

  const fetchBlogInfo = async () => {
    try {
      const response = await axios.post<backendresponse>(
        "/api/getBlogs",
        { blogId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        settitle(response.data.blog?.title || "");
        setcontent(response.data.blog?.content || "");
        setthumbnail(response.data.blog?.thumbnail || "");
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
    } else {
      fetchBlogInfo();
    }
  }, [session, status, router]);

  // Simple form validation state
  const [error, setError] = useState("");

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put<backendresponse>(
        "/api/Blogs",
        {
          title,
          content,
          thumbnail,
          blogId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        router.push("/Profile");
        console.log(response);
        toast.success("Blog Updated.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error("Invalid Input");
          console.log(error);
        } else if (status === 402) {
          toast.error("User with this content exist");
          console.log(error);
        } else if (status === 409) {
          toast.error("Oops try again!!");
          console.log(error);
        }
      } else {
        if (error instanceof Error) {
          toast.error("Soemthing went wrong");
          console.log(error);
        }
      }
    } finally {
      settitle("");
      setcontent("");
      setthumbnail("");
      setError("");
    }
  };

  return (
    <div className="min-h-screen w-full pt-20 pb-20 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white border  shadow-lg rounded-2xl max-w-full w-full p-8">
        <h1 className="text-3xl font-bold text-red-700 text-center mb-6">
          UPDATE BLOG
        </h1>
        <p className="text-gray-600 text-center mb-6">Update your Blog .</p>

        {error && (
          <p className="text-red-700 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleCreation}>
          {/* title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
              placeholder="Enter your title"
            />
          </div>

          {/* content Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              className="w-full h-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
              placeholder="Enter your content"
            />
          </div>

          {/* thumbnail Field */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2 font-medium">
              Thumbnail
            </label>
            <input
              type={"text"}
              value={thumbnail}
              onChange={(e) => setthumbnail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition pr-10"
              placeholder="Enter your thumbnail"
            />
          </div>
          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
