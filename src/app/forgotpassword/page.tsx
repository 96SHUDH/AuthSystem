"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { email });
            setMessage("Email sent! Check your inbox.");
        } catch (error: any) {
            setMessage("User not found or something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={submitHandler} className="flex flex-col space-y-4 w-80">
                <input 
                    type="email"
                    className="p-2 border border-gray-600 rounded text-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button 
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {message && <p className="mt-4 text-orange-400">{message}</p>}
        </div>
    );
}