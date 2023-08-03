import React from "react";
import Quest from "./Quest";

const Quests = () => {
  return (
    <div className="h-full bg-gray-600 border border-white p-1">
      <div className="h-full border border-red-500">
        <Quest />
      </div>
    </div>
  );
};

export default Quests;
