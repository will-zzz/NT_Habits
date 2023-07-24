import React from "react";
import CharacterSection from "./CharacterSection";
import ChecklistSection from "./ChecklistSection";
import ImageGridSection from "./ImageGridSection";

const Home = ({ user }) => {
  return (
    <>
      <CharacterSection user={user} />
      <ChecklistSection user={user} />
      <ImageGridSection />
    </>
  );
};

export default Home;
