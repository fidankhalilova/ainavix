import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/layout/RootLayout/Header";
import Footer from "@/layout/RootLayout/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "AINavix — Discover & Compare AI Tools",
    template: "%s | AINavix",
  },
  description: "Find the perfect AI tool for any task.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans `}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <ChatWidget />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
