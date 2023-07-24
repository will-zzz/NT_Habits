import React, { useState, useEffect } from "react";
import CharacterSection from "./components/CharacterSection";
import ChecklistSection from "./components/ChecklistSection";
import ImageGridSection from "./components/ImageGridSection";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-screen flex flex-wrap">
      <Navbar />
      <CharacterSection />
      <ChecklistSection />
      <ImageGridSection />
    </div>
  );
};

export default App;
