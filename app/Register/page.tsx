"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

type backendresponse = {
  success: boolean;
  message: string;
};

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Simple form validation state
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<backendresponse>(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        router.push("/");
        toast.success("REgsitration Successfull");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error("Invalid Input");
          console.log(error);
        } else if (status === 402) {
          toast.error("User with this email exist");
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
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white border  shadow-lg rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-red-700 text-center mb-6">
          Sign Up
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Create your NeuroPress account to start writing amazing Blogs
        </p>

        {error && (
          <p className="text-red-700 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSignUp}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-red-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-red-700 cursor-pointer hover:underline"
            onClick={() => router.push("/Signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
