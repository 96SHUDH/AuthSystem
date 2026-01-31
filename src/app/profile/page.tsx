"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        isVerified: false,
        isAdmin: false,
        avatar: "" // ✅ Add avatar here
    });
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); // State for upload loading

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUser(res.data.data);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    }

    // 👇 Function to handle file selection
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit file size to 2MB to prevent DB crashes
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File is too large! Please upload under 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = async () => {
            const base64Image = reader.result;
            try {
                setUploading(true);
                // Send to backend
                await axios.post('/api/users/avatar', { avatar: base64Image });
                
                // Update local state immediately
                setUser((prev) => ({ ...prev, avatar: base64Image as string }));
                toast.success("Profile image updated!");
            } catch (error: any) {
                toast.error("Failed to upload image");
            } finally {
                setUploading(false);
            }
        };
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 px-4">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 w-full"></div>

                <div className="px-8 pb-8 relative">
                    
                    {/* 👇 Updated Avatar Section */}
                    <div className="relative -mt-16 mb-4 flex justify-center group">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 shadow-md overflow-hidden relative">
                            
                            {/* The Image */}
                            <img 
                                // Show uploaded avatar OR fallback to Robohash
                                src={user.avatar || `https://robohash.org/${user.username || "placeholder"}?set=set4`} 
                                alt="Avatar"
                                className={`w-full h-full object-cover transition-opacity ${uploading ? "opacity-50" : "opacity-100"}`}
                            />

                            {/* Hover Overlay with Camera Icon */}
                            <label htmlFor="avatar-upload" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <span className="text-white text-sm font-bold">Change</span>
                            </label>
                            
                            {/* Loading Spinner */}
                            {uploading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>

                        {/* Hidden File Input */}
                        <input 
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="text-center space-y-2">
                        {loading ? (
                            <p className="text-blue-500 animate-pulse">Loading profile...</p>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                
                                <div className="mt-4 flex justify-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {user.isVerified ? "Verified Account" : "Unverified"}
                                    </span>
                                    {user.isAdmin && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>
                                    )}
                                </div>
                                
                                <hr className="my-6 border-gray-200" />
                                
                                <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">User ID</p>
                                    <p className="text-sm font-mono text-gray-600 break-all">{user._id}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}