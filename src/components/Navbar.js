// src/components/Navbar.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { sign } from "jsonwebtoken";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showTexts, setShowTexts] = useState(false); // State to manage the visibility of texts

  // Placeholder for the account button click handler (to be linked with Google Sign-In)
  const handleGoogle = async () => {
    if (!user) {
      // If the user is not signed in, sign in with Google
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } else {
      // If the user is signed in, sign out
      signOut(auth);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 h-12 bg-black text-white border-b-[1px] border-white flex items-center justify-between px-4">
      <div className="flex items-center">
        {/* Logo */}
        <div className="w-8 h-8 mr-4 flex-shrink-0">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="object-contain w-full h-full"
          />
        </div>
        {/* Title */}
        <Link href="/">
          <h1 className="text-xl font-bold">TaskHack</h1>
        </Link>
      </div>

      {/* Stats */}
      <div className="hidden lg:flex justify-center">
        <span className="mx-6">Location: Gas Station</span>
        <span className="mx-6">gBYTES: 0 / 1100</span>
        <span className="mx-6">Daily Streak: 0</span>
        <span className="mx-6">Days Until BYTES Claim: 0</span>
        {/* Add other text elements */}
      </div>

      <div className="flex items-center space-x-2">
        {/* Display  menu dropdown on small screens */}
        <div className="flex items-center lg:hidden">
          <MenuDropdown showTexts={showTexts} setShowTexts={setShowTexts} />
        </div>

        {/* GitHub Icon */}
        <a
          href="https://github.com/will-zzz/NT_Habits"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="mr-2" />
        </a>

        {/* Account Button */}
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="bg-black text-white border-white border-[0.5px] px-3 py-1 rounded-lg text-sm"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleGoogle}
            className="bg-black text-white border-white border-[0.5px] px-3 py-1 rounded-lg text-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
