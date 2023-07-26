import React from "react";
import TaskList from "./TaskList";

const ChecklistSection = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-gray-200">
      <div className="flex flex-col items-center">
        <TaskList user={user} />
      </div>
    </div>
  );
};

export default ChecklistSection;
