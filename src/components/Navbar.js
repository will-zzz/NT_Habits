// src/components/Navbar.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Navbar = () => {
  // Placeholder for the user's Ethereum address (last digits)
  const ethereumAddress = "0xAbCdEf...";

  // Placeholder for the account button click handler (to be linked with Google Sign-In)
  const handleGoogle = async (e) => {
    // Implement your account button click logic here
    console.log("Account button clicked");
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      {/* Left side - Logo */}
      <div className="flex items-center">
        {/* Replace this with your logo */}
        <img src="/path/to/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className="font-bold text-xl">My App</span>
      </div>

      {/* Right side - User-related elements */}
      <div className="flex items-center">
        {/* Ethereum address */}
        <span className="mr-4">{ethereumAddress}</span>

        {/* Account button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleGoogle}
        >
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
