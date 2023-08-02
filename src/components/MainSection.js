import React from "react";
import Quests from "./Quests";
import Dailies from "./Dailies";
import Inventory from "./Inventory";

const MainSection = ({ user }) => {
  return (
    <div className="flex flex-grow bg-black h-full">
      <div className="w-1/3">
        <Quests />
      </div>
      <div className="w-1/3">
        <Dailies user={user} />
      </div>
      <div className="w-1/3">
        <Inventory />
      </div>
    </div>
  );
};

export default MainSection;
