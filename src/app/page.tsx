"use client";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      
      {/* --- Hero Section --- */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Welcome to Secure <span className="text-blue-500">Authentication</span> <br /> 
          With Chaturvedi.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          A robust, full-stack Next.js template featuring secure login, 
          email verification, password reset, and profile management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/signup" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started for Free
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 bg-transparent border border-gray-700 hover:border-white text-white rounded-full font-bold transition-all"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors">
            <div className="text-blue-500 text-3xl mb-4 font-bold">01.</div>
            <h3 className="text-xl font-bold mb-2">Secure JWT Auth</h3>
            <p className="text-gray-400 text-sm">
              Industry-standard security using JSON Web Tokens and secure cookies.
            </p>
          </div>

          <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors">
            <div className="text-blue-500 text-3xl mb-4 font-bold">02.</div>
            <h3 className="text-xl font-bold mb-2">Email Verification</h3>
            <p className="text-gray-400 text-sm">
              Confirm user identities with automated Mailtrap-powered verification.
            </p>
          </div>

          <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors">
            <div className="text-blue-500 text-3xl mb-4 font-bold">03.</div>
            <h3 className="text-xl font-bold mb-2">Password Recovery</h3>
            <p className="text-gray-400 text-sm">
              Secure forgot-password flow with unique reset tokens and expiry.
            </p>
          </div>

        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2026 2026 AuthSystem | Developed by Shudhanshu Chaubey. All Rights Reserved</p>
      </footer>
    </div>
  );
}