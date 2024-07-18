import React from "react";
import Banner from "./Banner";
import Divider from "./Divider";
import MainSection from "./MainSection";

const Home = ({ user }) => {
  // console.log(user);
  return (
    <>
      {user ? (
        <div className="h-screen flex flex-col">
          <Banner user={user} />
          <Divider />
          <MainSection user={user} />
        </div>
      ) : (
        <div className="h-screen w-full bg-black content-center text-center">
          <h1 className="text-white text-4xl">
            Please sign in with Google to continue.
          </h1>
        </div>
      )}
      ;
    </>
  );
};

export default Home;
