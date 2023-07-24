import React, { useState } from "react";
import { auth, database } from "../firebase/firebaseConfig";

const TaskForm = ({ userId }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      const tasksRef = database.ref(`users/${userId}/tasks`);
      tasksRef.push({ name: taskName, completed: false });
      setTaskName("");
    }
  };

  return (
    <div className="my-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {} /* Add code to show the task form */}
      >
        Add Task
      </button>

      {/* Add code for the task form */}
      {/* Include a text input and a submit button */}
    </div>
  );
};

export default TaskForm;
