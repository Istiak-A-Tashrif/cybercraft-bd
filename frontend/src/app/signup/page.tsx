"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await authService.googleAuth(credentialResponse.credential);
      router.push("/dashboard");
    } catch (err) {
      console.error("Google signup failed", err);
      setError("Google signup failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await authService.register({
        name: fullName,
        email,
        password,
      });

      router.push("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="bg-gradient-to-br from-[#C7DCFD] to-[#F5F9FC] rounded-lg w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
        {/* Left Section with Logo */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="mb-8">
            <Image
              height={120}
              width={200}
              alt="Brand Logo (Cyber Craft)"
              src={"/images/cybercraft.svg"}
              className="h-auto w-48"
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-gray-800 text-xl">
              Join CyberCraft Bangladesh,
              <br />
              where your creativity thrives
            </p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="md:w-1/2 p-8 rounded-r-lg">
          <form onSubmit={handleSignup}>
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345484] bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345484] bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Create a password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="must be 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345484] bg-white"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345484] bg-white"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#345484] hover:bg-[#2a406b] text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Create account
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">Or</p>

              {/* Google Signup Button */}
              <div className="flex justify-center mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google signup failed")}
                />
              </div>

              <p className="mt-2">
                Already have an account?
                <a href="/login" className="text-[#345484] ml-1 font-medium">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
