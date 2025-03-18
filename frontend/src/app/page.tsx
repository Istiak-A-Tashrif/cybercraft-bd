"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { authService, contactService } from "@/services/api";
import ConfirmationDialog from "@/components/ConfirmationDialog"; // Import the shared ConfirmationDialog component

const ContactPage: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let contact = await contactService.getCurrentUserContact();

        if (contact?.data) {
          setFormData({
            fullName: contact?.data?.fullName || "",
            email: contact?.data?.email || "",
            message: contact?.data?.message || "",
          });
        } else {
          const user = await authService.getCurrentUser();
          if (user) {
            setFormData((prev) => ({
              ...prev,
              fullName: user?.data?.name || "",
              email: user?.data?.email || "",
              message: contact?.message || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await contactService.createOrUpdateContact(formData);

      setDialog({
        isOpen: true,
        title: "Thank You!",
        description: `Thank you, ${formData.fullName}! Your message has been received.`,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setDialog({
        isOpen: true,
        title: "Error",
        description:
          "There was an error submitting your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar setIsNavbarVisible={setIsNavbarVisible} />
      <div
        className={`relative w-full overflow-hidden bg-[#E3ECFE] flex items-center justify-center py-6 transition-all duration-500 ${
          isNavbarVisible
            ? "min-h-[calc(100vh-100px)]  md:min-h-[calc(100vh-52px)]"
            : "min-h-screen"
        }`}
      >
        <div className="absolute inset-0 bg-[#99bbf1] clip-path-custom hidden md:block"></div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20">
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 z-20 relative">
            <div className="flex items-center">
              <Image
                height={120}
                width={200}
                alt="Brand Logo (Cyber Craft)"
                src={"/images/cybercraft.svg"}
                className="h-auto w-48"
                priority
              />
            </div>

            <p className="text-gray-700 text-sm md:text-base">
              Welcome back to CyberCraft Bangladesh,
              <br />
              where your creativity thrives
            </p>

            <form className="space-y-6 relative z-30" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Your full name"
                  className="w-full p-3 border text-gray-700 bg-white border-[#D8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="w-full p-3 border bg-white border-[#D8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Write message"
                  rows={4}
                  className="w-full p-3 border bg-white border-[#D8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#395482] hover:bg-blue-800 text-white py-3 px-4 rounded transition duration-200 flex items-center justify-center cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Submitting...</span>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center relative bg-[#99bbf1] mt-6 md:bg-transparent">
            <Image
              height={600}
              width={500}
              alt="Character illustration"
              src={"/images/asset-1.svg"}
              className="object-contain z-10"
              priority
            />
          </div>
        </div>
      </div>

      {/* ConfirmationDialog Component */}
      <ConfirmationDialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog((prev) => ({ ...prev, isOpen: false }))}
        title={dialog.title}
        description={dialog.description}
      />
    </>
  );
};

export default ContactPage;
