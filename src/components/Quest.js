import React, { useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Quest = () => {
  const [expanded, setExpanded] = useState(false);

  const handleDropdownClick = () => {
    setExpanded(!expanded);
  };

  const subListItems = [
    { id: 1, text: "Sub Task 1", completed: false },
    { id: 2, text: "Sub Task 2", completed: false },
    { id: 3, text: "Sub Task 3", completed: false },
  ];

  const onDragEnd = (result) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="border border-white p-2 mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-white">Quest Title</h2>
          <button
            onClick={handleDropdownClick}
            className="bg-transparent text-white outline-none"
          >
            {expanded ? "-" : "+"}
          </button>
        </div>
        {expanded && (
          <ul className="ml-4 mt-2">
            {subListItems.map((subTask) => (
              <ListItem key={subTask.id} task={subTask} />
            ))}
          </ul>
        )}
      </div>
    </DragDropContext>
  );
};

export default Quest;
