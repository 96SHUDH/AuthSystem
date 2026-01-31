"use client";
import Link from 'next/link';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ✅ NEW: State to track verification status
  const [isVerified, setIsVerified] = useState(true); // Default true to hide warning initially

  useEffect(() => {
    const checkLogin = async () => {
        try {
            // Get full user details
            const res = await axios.get('/api/users/me');
            
            // If successful, they are logged in
            setIsLoggedIn(true);
            
            // ✅ NEW: Check the specific 'isVerified' field from DB
            setIsVerified(res.data.data.isVerified);
            
        } catch (error) {
            // If error, they are likely not logged in
            setIsLoggedIn(false);
        }
    }
    checkLogin();
  }, [pathname]); // Re-run on page change

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      setIsLoggedIn(false);
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const getLinkClass = (path: string) => {
    return pathname === path 
        ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1"
        : "text-gray-300 hover:text-white transition-colors";
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="text-xl font-bold tracking-wider">
        <Link href="/" className="hover:text-blue-400 transition-colors">
          AuthSystem
        </Link>
      </div>

      <ul className="flex items-center gap-6 font-medium">
        <li>
            <Link href="/" className={getLinkClass('/')}>
                Home
            </Link>
        </li>

        {isLoggedIn ? (
            <>
                {/* ✅ NEW: Only show this if User is NOT Verified */}
                {!isVerified && (
                    <li>
                        <Link 
                            href="/verifyemail" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm font-bold shadow-lg animate-pulse"
                        >
                            ⚠️ Verify Email
                        </Link>
                    </li>
                )}

                <li>
                    <Link href="/profile" className={getLinkClass('/profile')}>
                        Profile
                    </Link>
                </li>
                <li>
                    <button 
                        onClick={logout} 
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm transition-all shadow text-white"
                    >
                        Logout
                    </button>
                </li>
            </>
        ) : (
            <>
                <li>
                    <Link href="/login" className={getLinkClass('/login')}>
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/signup" className={getLinkClass('/signup')}>
                        Sign Up
                    </Link>
                </li>
            </>
        )}
      </ul>
    </nav>
  );
}