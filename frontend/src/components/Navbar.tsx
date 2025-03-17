"use client";

import { authService } from "@/services/api";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = ({ setIsNavbarVisible }: any) => {
  const [user, setUser] = useState<{
    name: string;
    role: string;
    providerData?: any;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const getNavbarHeight = () => (window.innerWidth < 640 ? 100 : 52);

  const token = getCookie("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData?.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);

  // Function to reset the hide timeout
  const resetHideTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const handleUserActivity = () => {
      resetHideTimeout();
    };

    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetHideTimeout(); // Start timeout on mount

    return () => {
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Apply dynamic padding to the main content
  useEffect(() => {
    document.body.style.paddingTop = visible ? `${getNavbarHeight()}px` : "0px";
    document.body.style.transition = "padding-top 0.3s ease";
    setIsNavbarVisible(visible);
  }, [visible]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/logged-out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`bg-white py-2 px-4 lg:px-32 fixed top-0 left-0 right-0 transition-transform duration-300 z-100 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:flex items-center justify-between">
        {/* Logo */}
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

        {/* Right Section */}
        <div className="flex justify-end items-center flex-1 space-x-4">
          {/* Search Bar */}
          <div className="max-w-lg w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-1 bg-gray-100 rounded-md focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-2 text-gray-400" />
            </div>
          </div>

          {/* Notification & User Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <div className="relative mr-3">
              <div className="bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center absolute -top-1 -right-1">
                2
              </div>
              <FaBell className="w-5 h-5 text-gray-600" />
            </div>

            {/* User Profile & Dropdown */}
            {user ? (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <div className="mr-2 text-right">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                  <Image
                    src={user?.providerData?.picture || "/images/avatar.svg"}
                    alt="User Avatar"
                    height={32}
                    width={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-32">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
