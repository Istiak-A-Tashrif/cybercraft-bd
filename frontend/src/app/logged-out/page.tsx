"use client";
import Navbar from "@/components/Navbar";
// pages/confirmation.js
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <Navbar setIsNavbarVisible={setIsNavbarVisible} />
      <div
        className={`${
          isNavbarVisible ? "min-h-[calc(100vh-52px)]" : "min-h-screen"
        } transition-all duration-500 flex flex-col bg-gray-100`}
      >
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
                className="w-full bg-[#345484] hover:bg-[#2a406b] text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer"
              >
                Go Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
