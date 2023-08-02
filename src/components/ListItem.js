import React from "react";

const ListItem = ({ task, handleTaskToggle, handleDeleteTask }) => {
  return (
    <li className="relative mb-3 mx-1">
      {/* Shadow effect */}
      <div className="absolute top-1 left-1 w-full h-full bg-black border border-white"></div>

      {/* Main Box */}
      <div className="relative flex items-center justify-between bg-black border border-white p-2">
        {/* Checkbox */}
        <label>
          <input
            type="checkbox"
            className="mr-4"
            checked={task.completed}
            onChange={() => handleTaskToggle(task.id, task.completed)}
          />
        </label>

        {/* Text */}
        <span
          className={`flex-grow overflow-ellipsis overflow-hidden ${
            task.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {/* Add your text here */}
          {task.task}
        </span>

        {/* Options button */}
        <button
          className="mr-2 text-white"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          {/* Add your ellipses icon here */}
          ...
        </button>

        {/* Hamburger slider */}
        <button className="hamburger-icon flex flex-col justify-between w-4 h-2">
          <span className="hamburger-line w-full h-[1px] bg-white"></span>
          <span className="hamburger-line w-full h-[1px] bg-white"></span>
          <span className="hamburger-line w-full h-[1px] bg-white"></span>
        </button>
      </div>
    </li>
  );
};

export default ListItem;
