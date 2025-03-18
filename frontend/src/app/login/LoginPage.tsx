"use client";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      await authService.googleAuth(credentialResponse.credential);
      router.push("/");
    } catch (err) {
      console.error("Google login failed", err);
      setError("Google login failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login({ email, password });
      router.push("/"); // Redirect to dashboard after login
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="bg-gradient-to-br from-[#C7DCFD] to-[#F5F9FC] rounded-lg w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
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
              Welcome back to CyberCraft Bangladesh,
              <br />
              where your creativity thrives
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-8 rounded-r-lg">
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345484] bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="custom-checkbox"
                />
                <label htmlFor="remember-me" className="ml-2 text-[#345484]">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-[#345484] text-sm">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#345484] hover:bg-[#2a406b] text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Log in
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">Or</p>

              {/* Google Login Button */}
              <div className="flex justify-center mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google login failed")}
                />
              </div>

              <p className="mt-2">
                Don't have an account?
                <a href="/signup" className="text-[#345484] ml-1 font-medium">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
