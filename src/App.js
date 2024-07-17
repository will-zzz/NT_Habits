import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"; // Import the useAuthState hook
import { auth } from "./firebase/firebaseConfig";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AccountPage from "./components/AccountPage";
import axios from "axios";

const App = () => {
  // Get the user's authentication state using useAuthState hook
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // Check if the user is signed in
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Get the user's timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Send the user's UID and timezone to the backend
        axios.post("http://localhost:6969/api/update-timezone", {
          uid: user.uid,
          timezone: timezone,
        });
      }
    });
  }, []);

  // Conditional rendering based on the user's authentication state
  if (loading) {
    // Show a loading screen if the authentication state is still loading
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <div className="bg-black">
      {/* Always show the Navbar, regardless of the user's authentication state */}
      <Navbar />

      {/* If the user is signed in, show the app components */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/account" element={<AccountPage user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
