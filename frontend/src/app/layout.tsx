import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "../components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Craft",
  description: "Cyber Craft Bangladesh",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  openGraph: {
    title: "Cyber Craft",
    description: "Cyber Craft Bangladesh",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Cyber Craft",
    images: [
      {
        url: "/images/cybercraft.svg",
        width: 294,
        height: 129,
        alt: "Cyber Craft Bangladesh Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Craft",
    description: "Cyber Craft Bangladesh",
    site: "@istiaktashrif",
    creator: "@istiaktashrif",
    images: ["/images/cybercraft.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_GOOGLE_CLIENT_ID as string}
        >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
