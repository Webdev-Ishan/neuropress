"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Blogresponse = {
  id: string;
  title: string;
  thumbnail: string;
  author: {
    username: string;
    email: string;
  };
};

type Blog = {
  success: boolean;
  blogs: Blogresponse;
};

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const params = useParams();
  const { blogId } = params;

  if (!blogId) {
    toast.error("Blog id is not given");
  }
  console.log(blogId);

  const [blog, setBlog] = useState<Blogresponse | null>(null);

  const fetchBlogInfo = async () => {
    try {
      const response = await axios.post<Blog>(
        "/api/getBlogs",
        {
          blogId: blogId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setBlog(response.data.blogs);
        console.log(response);
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Signin");
    } else {
      fetchBlogInfo();
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4 py-10"></div>
  );
}
