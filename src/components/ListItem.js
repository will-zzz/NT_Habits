import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({
  task,
  index,
  handleTaskToggle,
  handleDeleteTask,
  questId,
}) => {
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
            {/* Delete button */}
            <button
              className="mr-2 text-inherit"
              onClick={() => {
                handleDeleteTask(task.id);
              }}
            >
              {/* Trashcan symbol svg*/}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                  // dark gray fill
                  fill="#212121"
                />
                <path
                  d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                  fill="#212121"
                />
              </svg>
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
