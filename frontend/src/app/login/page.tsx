import React from "react";
import LoginPage from "./LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber Craft | Login",
  description: "Login Page",
};

const page = () => {
  return <LoginPage />;
};

export default page;
