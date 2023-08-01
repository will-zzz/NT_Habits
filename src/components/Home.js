import React from "react";
import CharacterSection from "./CharacterSection";
import ChecklistSection from "./ChecklistSection";
import ImageGridSection from "./ImageGridSection";
import Banner from "./Banner";

const Home = ({ user }) => {
  return (
    <>
      {/* <CharacterSection user={user} /> */}
      {/* <ChecklistSection user={user} /> */}
      {/* <ImageGridSection /> */}

      <Banner user={user} />
    </>
  );
};

export default Home;
