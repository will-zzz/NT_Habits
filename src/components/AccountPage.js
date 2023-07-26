// src/components/AccountPage.js
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";

const AccountPage = ({ user }) => {
  const [displayName, setDisplayName] = useState("");

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        const response = await axios.put(
          `http://localhost:6969/api/update-name/${user.uid}`,
          {
            displayName: displayName,
          }
        );
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Display Name:
        </label>
        <input
          type="text"
          className="border rounded-md px-3 py-2 mt-1 w-full"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
      {/* Sign Out Button (firebase google auth) */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default AccountPage;
