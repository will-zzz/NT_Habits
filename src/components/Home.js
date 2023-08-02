import React from "react";
import Banner from "./Banner";
import Divider from "./Divider";
import MainSection from "./MainSection";

const Home = ({ user }) => {
  return (
    <div className="h-screen flex flex-col">
      <Banner user={user} />
      <Divider />
      <MainSection user={user} />
    </div>
  );
};

export default Home;
