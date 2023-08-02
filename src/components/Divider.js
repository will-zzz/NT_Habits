import React from "react";

const Divider = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white border-t-[1px] border-b-[1px] border-white h-8 w-full">
      <div className="w-1/3 h-full flex items-center justify-center">
        <span className="text-center">QUESTS</span>
      </div>
      <div className="w-1/3 h-full flex items-center justify-center">
        <span className="text-center">DAILIES</span>
      </div>
      <div className="w-1/3 h-full flex items-center justify-center">
        <span className="text-center">INVENTORY</span>
      </div>
    </div>
  );
};

export default Divider;
