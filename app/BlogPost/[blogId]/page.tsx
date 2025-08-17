"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ThumbsUp } from "lucide-react";

type Blogresponse = {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  author?: {
    username: string;
    email: string;
  };
};

type Blog = {
  success: boolean;
  blog: Blogresponse;
};

type BlogRelated = {
  success: boolean;
  blogs: Blogresponse[];
};

type LikeBackend = {
  success: boolean;
  message: string;
};

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const params = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { blogId } = params;

  if (!blogId) {
    toast.error("Blog id is not given");
  }
  console.log(query);
  const [blog, setBlog] = useState<Blogresponse | null>(null);
  const [relatedblogs, setRelatedBlogs] = useState<Blogresponse[]>([]);

  const fetchRelated = async (query: string) => {
    try {
      const response = await axios.post<BlogRelated>(
        "/api/search",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setRelatedBlogs(response.data.blogs);
      } else {
        setRelatedBlogs([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const fetchBlogInfo = async () => {
    try {
      const response = await axios.post<Blog>(
        "/api/getBlogs",
        { blogId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setBlog(response.data.blog);
      } else {
        setBlog(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const Likeit = async (blogId: string) => {
    try {
      const response = await axios.post<LikeBackend>(
        "/api/likes",
        { blogId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Response Submited");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  // Fetch main blog
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Signin");
    } else {
      fetchBlogInfo();
    }
  }, [status, session]);

  // Fetch related blogs only once when blog title is loaded
  useEffect(() => {
    if (query) {
      fetchRelated(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      {/* Thumbnail Section */}
      <section className="relative w-full h-[420px] rounded-2xl shadow-lg overflow-hidden mb-10">
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold uppercase tracking-wide drop-shadow-lg text-center px-4">
            {blog?.title}
          </h1>
        </div>
      </section>

      <section className="w-full  mx-auto px-4 py-8 bg-white">
        {blog?.content.split("\n").map((paragraph, idx) => {
          const words = paragraph.split(" ");
          if (words.length === 0) return null;

          const firstWord = words.shift();

          // First sentence (optional red highlight)
          const firstSentence = words.join(" ").split(". ")[0] + "-";
          const restOfParagraph = words
            .join(" ")
            .substring(firstSentence.length);

          const keywords = ["AI", "Narrow", "Specific", "Tasks"]; // example keywords

          return (
            <p
              key={idx}
              className="text-lg leading-relaxed text-black mb-6 whitespace-pre-line"
            >
              {/* First word bold black */}
              <span className="font-bold text-black">{firstWord} </span>

              {/* First sentence in red */}
              <span className="text-red-600 font-semibold">
                {firstSentence}{" "}
              </span>

              {/* Rest of paragraph */}
              {restOfParagraph.split(" ").map((word, i) => {
                // Keywords bold in red
                if (keywords.includes(word.replace(/[.,]/g, ""))) {
                  return (
                    <span key={i} className="font-bold text-red-600">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
            </p>
          );
        })}
      </section>

      {/* Author + Like Section */}
      <div className="w-full flex justify-between items-center border-t pt-6 mt-8 max-w-4xl mx-auto">
        {/* Like Button on Left */}
        <div className="flex items-center">
          <ThumbsUp
            onClick={() => Likeit(blog?.id ?? "")}
            className="text-lg cursor-pointer text-red-600 hover:scale-110 transition"
          />
        </div>

        {/* Author Info on Right */}
        <div className="flex flex-col items-end">
          <p className="text-black cursor-pointer text-base italic">
            — {blog?.author?.username}
          </p>
          <p className="text-red-600 cursor-pointer text-base italic">
            {blog?.author?.email}
          </p>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedblogs.length > 0 && (
        <section className="w-full max-w-6xl pt-12 mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedblogs.map((related) => (
              <div
                key={related.id}
                className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  router.push(
                    `/BlogPost/${related.id}?query=${encodeURIComponent(
                      query ?? ""
                    )}`
                  )
                }
              >
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
