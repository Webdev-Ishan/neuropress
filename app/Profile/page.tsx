"use client";

import React, { useEffect, useState } from "react";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash } from "lucide-react";
type Blog = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
};

type backendresponse = {
  success: boolean;
  existingUser: {
    username: string;
    email: string;
    blogs: Blog[];
  };
};

type backendresponse2 = {
  success: boolean;
  message: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [blogs, setblogs] = useState<Blog[]>([]);

  const fetchUserinfo = async () => {
    try {
      const response = await axios.get<backendresponse>("/api/auth/Profile", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log(response);
        setUsername(response.data.existingUser.username);
        setEmail(response.data.existingUser.email);
        setblogs(response.data.existingUser.blogs);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status) {
        const status = error.response.status;

        if (status === 400) {
          toast.error("PLease Login First");
          console.log(error);
        } else {
          toast.error("PLease Regsiter");
          console.log(error);
        }
      } else {
        toast.error("SOemthign went wrong");
        console.log(error);
      }
    }
  };

  const { data: session, status } = useSession();

  const handledelete = async (id: string) => {
    if (!id) {
      toast.error("Send ID as well");
    }

    try {
      const response = await axios.delete<backendresponse2>("/api/Blogs", {
        data: { blogId: id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Blog deleted Successfully");
        fetchUserinfo();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("Signin");
    } else {
      fetchUserinfo();
    }
  }, [router, session, status]);

  return (
  <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 px-6 py-20">
  <div className="max-w-6xl mx-auto space-y-20">
    {/* Profile Section */}
    <section className="bg-white shadow-lg rounded-3xl p-12 flex flex-col items-center text-center border border-gray-100 relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-50 via-white to-gray-50 rounded-3xl"></div>

      {/* Avatar */}
      <div onClick={()=>router.push("/EditProfile")} className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white flex items-center justify-center text-5xl font-bold mb-6 shadow-lg ring-4 ring-red-100">
        {username.charAt(0)}
      </div>

      {/* Username */}
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
        {username}
      </h2>

      {/* Email */}
      <p className="text-gray-600 text-lg">{email}</p>
    </section>

    {/* Blogs Section */}
    <section>
      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14 text-center">
        <span className="text-red-600">Your</span> Blogs & Articles
      </h3>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-2">
        {blogs.map((card) => (
          <MinimalCard
            key={card.id}
            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col"
          >
            {/* Thumbnail */}
            <MinimalCardImage
              onClick={() => router.push(`/BlogPost/${card.id}`)}
              className="h-56 w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
              src={card.thumbnail}
              alt={card.title}
            />

            {/* Card Body */}
            <div className="flex flex-col flex-grow p-6">
              <MinimalCardTitle className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition">
                {card.title}
              </MinimalCardTitle>

              {/* Actions */}
              <div className="mt-auto flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/EditBlog/${card.id}`)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                  title="Edit"
                >
                  <Pencil className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={() => handledelete(card.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition"
                  title="Delete"
                >
                  <Trash className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </MinimalCard>
        ))}
      </div>
    </section>
  </div>
</main>

  );
}
