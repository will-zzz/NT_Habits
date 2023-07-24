// src/components/Navbar.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  // Placeholder for the user's Ethereum address (last digits)
  const ethereumAddress = "0xAbCdEf...";

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

  // Get the user's authentication state using useAuthState hook
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      {/* Left side - Logo */}
      <div className="flex items-center">
        {/* Replace this with your logo */}
        <img src="img/logo.jpeg" alt="Logo" className="w-8 h-8 mr-2" />
        {/* Clickable text that links to /  */}
        <Link to="/" className="font-bold text-xl">
          Citizen Habits
        </Link>
      </div>

      {/* Right side - User-related elements */}
      <div className="flex items-center">
        {/* Ethereum address */}
        <span className="mr-4">{ethereumAddress}</span>

        {/* Account button */}
        <div className="flex items-center">
          {user ? (
            // Show "Account" button and link to the account page
            <Link to="/account" className="mr-4 text-white">
              Account
            </Link>
          ) : (
            // Show "Log In" button when the user is not signed in
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleGoogle}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
