import React from "react";

const CharacterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-gray-100">
      {/* Character image */}
      <img
        src="./img/CITIZEN.png"
        alt="Character"
        className="h-1/3 mb-4 object-contain"
      />

      {/* User's name */}
      <h2 className="text-xl font-bold">User's Name</h2>

      {/* Health bar */}
      <div className="w-64 h-6 bg-gray-300 rounded-md mt-2">
        <div className="h-full bg-green-500 rounded-md"></div>
      </div>

      {/* Experience bar */}
      <div className="w-64 h-6 bg-gray-300 rounded-md mt-2">
        <div className="h-full bg-blue-500 rounded-md"></div>
      </div>
    </div>
  );
};

export default CharacterSection;
