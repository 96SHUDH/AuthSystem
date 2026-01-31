"use client";

import Link from "next/link";
import React, { useEffect } from "react";  
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            toast.error(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        // ✅ 1. Outer Container: Light gray background, centered content
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 px-4 sm:px-0">
            
            {/* ✅ 2. Card: White background, shadow, rounded corners */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {loading ? "Signing In..." : "Welcome To Login Page"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">Please  Login to your account</p>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                    {/* EMAIL INPUT */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    {/* PASSWORD INPUT WITH TOGGLE */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Enter you password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-700 font-medium focus:outline-none"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md
                    ${buttonDisabled || loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-black hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                >
                    {loading ? (
                         <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        "Login"
                    )}
                </button>

                {/* FOOTER LINKS */}
                <div className="flex flex-col items-center space-y-2 text-sm">
                    <Link href="/forgotpassword" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors font-medium">
                        Forgot Password?
                    </Link>

                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-medium text-black hover:underline transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}