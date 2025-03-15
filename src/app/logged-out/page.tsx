"use client";
// pages/confirmation.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBell, FaSearch } from "react-icons/fa";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow px-4 py-2">
        <div className="flex items-center justify-between container mx-auto">
          {" "}
          <div className="flex items-center">
            <Image
              height={40}
              width={40}
              alt="Brand Logo (Cyber Craft)"
              src={"/images/cybercraft.svg"}
              className="h-auto w-16"
              priority
            />
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <FaSearch   className="w-4 h-4 absolute right-2 top-2 text-gray-500" />
            </div>

            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center absolute -top-1 -right-1">
                  2
                </div>
                <FaBell className="w-5 h-5 text-gray-600" />
              </div>

              <div className="flex items-center">
                <div className="mr-2">
                  <div className="text-sm font-medium">Arya Stark</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/avatar.svg"
                    alt="User Avatar"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-52px)]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <Image
                height={160}
                width={180}
                alt="Brand Logo (Cyber Craft)"
                src={"/images/cybercraft.svg"}
                className="h-auto w-48"
                priority
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-1">
              Thank you so much for your nice contribution for today.
            </h2>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Go Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
