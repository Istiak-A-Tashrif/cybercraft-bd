import { Metadata } from "next";
import ContactsPage from "./components/ContactsPage";


export const metadata: Metadata = {
  title: "Cyber Craft | Contacts",
  description: "Contacts Page",
};

const page = () => {
  return <ContactsPage />;
};

export default page;
