import React from "react";
import Quests from "./Quests";
import Dailies from "./Dailies";
import Inventory from "./Inventory";

const MainSection = ({ user }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/3 m-1">
        <Quests />
      </div>
      <div className="w-1/3 m-1">
        <Dailies user={user} />
      </div>
      <div className="w-1/3 m-1">
        <Inventory />
      </div>
    </div>
  );
};

export default MainSection;
