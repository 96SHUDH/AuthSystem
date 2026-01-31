"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function that actually hits the server
    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            toast.success("Email verified successfully!");
        } catch (error: any) {
            setError(true);
            toast.error(error.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    }

    // Auto-detect token from URL (e.g. ?token=abc12345)
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Verify Email</h1>
                <hr className="mb-6 border-gray-200" />

                {/* State 1: Success */}
                {verified && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your email has been verified.</p>
                        <Link href="/login" className="text-blue-600 font-bold underline mt-2 block">
                            Login Now
                        </Link>
                    </div>
                )}

                {/* State 2: Error */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Error</p>
                        <p>Invalid or Expired Token.</p>
                    </div>
                )}

                {/* State 3: Input / Button */}
                {!verified && (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            If you have a manual code, enter it below. Otherwise, click the link in your email.
                        </p>
                        
                        <input 
                            type="text"
                            placeholder="Paste Token Here"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />

                        <button
                            onClick={verifyUserEmail}
                            disabled={token.length === 0 || loading}
                            className={`w-full py-2 rounded text-white font-bold transition-all
                                ${token.length > 0 
                                    ? "bg-blue-600 hover:bg-blue-700 shadow-md" 
                                    : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            {loading ? "Verifying..." : "Verify Now"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}