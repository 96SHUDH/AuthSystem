"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(decodeURIComponent(urlToken || "").trim());
    }, []);

    const onReset = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/resetpassword", { token, password: newPassword });
            alert("Password updated!");
        } catch (error: any) {
            console.log("Reset failed", error.response.data);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Reset Password</h1>
            <input
                type="password"
                placeholder="New Password"
                className="p-2 border border-gray-300 rounded text-white"
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
            />
            <button
                onClick={onReset}
                className="p-2 bg-blue-500 text-white mt-4"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Password"}
            </button>
        </div>
    )
}
