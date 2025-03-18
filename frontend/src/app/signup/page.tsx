import { Metadata } from "next";
import SignUpPage from "./SignUpPage";

export const metadata: Metadata = {
  title: "Cyber Craft | Sign Up",
  description: "Sign Up Page",
};

const page = () => {
  return <SignUpPage />;
};

export default page;
