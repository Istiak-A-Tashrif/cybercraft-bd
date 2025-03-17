"use client";
import Image from "next/image";
import React from "react";

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form values using event.target
    const form = event.target as HTMLFormElement;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement)
      ?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      ?.value;

    console.log("Form Submitted:", { fullName, email, message });

    alert(`Thank you, ${fullName}! Your message has been received.`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#E3ECFE] flex items-center justify-center py-6">
      <div className="absolute inset-0 bg-[#99bbf1] clip-path-custom hidden md:block"></div>
      {/* <FacebookLogin
        buttonStyle={{ padding: "6px" }}
        appId={process.env.FACEBOOK_APP_ID} // we need to get this from facebook developer console by setting the app.
        autoLoad={false}
        fields="name,email,picture"
        callback={async (response) => {
          if (response?.status === "unknown") {
            console.error(
              "Sorry!",
              "Something went wrong with facebook Login."
            );
            return;
          }
          try {
            // Pass the ID token as tokenId
            await authService.facebookAuth(response.accessToken, response.userID);
            // router.push("/dashboard");
          } catch (err) {
            // setError(err.response?.data?.message || "Google login failed");
          } finally {
            // setLoading(false);
          }
        }}
      /> */}

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
              <label htmlFor="fullName" className="block text-sm text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Your full name"
                className="w-full p-3 border text-gray-700 bg-white border-[#D8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write message"
                rows={4}
                className="w-full p-3 border bg-white border-[#D8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#395482] hover:bg-blue-800 text-white py-3 px-4 rounded transition duration-200"
            >
              Submit
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
  );
};

export default ContactPage;
