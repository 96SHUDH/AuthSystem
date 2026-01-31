import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ✅ Added for notifications
import Navbar from "@/components/Navbar"; // ✅ We will create this next

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthSystem | Secure Full-Stack App", // ✅ Professional Title
  description: "A smooth full-stack authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Global Toaster */}
        <Navbar /> {/* ✅ Global Navbar */}
        <main className="min-h-screen">
            {children}
        </main>
      </body>
    </html>
  );
}