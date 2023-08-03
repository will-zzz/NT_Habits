import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({ task, index, handleTaskToggle, handleDeleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`relative mb-3 mx-1 ${
            task.completed ? "border-gray-500" : "border-white"
          } ${task.completed ? "text-gray-500" : "text-white"}`}
        >
          {/* Shadow effect */}
          <div className="absolute top-1 left-1 w-full h-full bg-black border border-inherit"></div>

          {/* Main Box */}
          <div className="relative flex items-center justify-between bg-black border border-inherit p-2">
            {/* Checkbox */}
            <div
              className={`w-6 h-6 border mr-2 border-inherit ${
                task.completed ? "text-gray-500" : "text-transparent"
              } flex items-center justify-center cursor-pointer user-select-none`}
              onClick={() => handleTaskToggle(task.id, task.completed)}
            >
              {task.completed && <span className="text-lg">✗</span>}
            </div>
            {/* Text */}
            <span className="flex-grow overflow-ellipsis overflow-hidden text-inherit">
              {/* Add your text here */}
              {task.task}
            </span>
            {/* Options button */}
            <button
              className="mr-2 text-inherit"
              onClick={() => {
                handleDeleteTask(task.id);
              }}
            >
              {/* Add your ellipses icon here */}
              ...
            </button>
            {/* Hamburger slider */}
            <div
              {...provided.dragHandleProps}
              className="hamburger-icon flex flex-col justify-between w-4 h-2"
            >
              <span
                className={`hamburger-line w-full h-[1px] ${
                  task.completed ? "bg-gray-500" : "bg-white"
                }`}
              ></span>
              <span
                className={`hamburger-line w-full h-[1px] ${
                  task.completed ? "bg-gray-500" : "bg-white"
                }`}
              ></span>
              <span
                className={`hamburger-line w-full h-[1px] ${
                  task.completed ? "bg-gray-500" : "bg-white"
                }`}
              ></span>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
