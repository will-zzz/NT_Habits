import React, { useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";

const TaskForm = ({ user }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure the task field is not empty before submitting
    if (task.trim() === "") {
      return;
    }

    // Create a new task object with the task data
    const newTask = {
      task: task.trim(),
    };

    // Push the new task to the user's tasks node in Firebase database
    // database.ref(`users/${userId}/tasks`).push(newTask);
    const taskListRef = ref(database, `users/${user.uid}/tasks`);
    const newTaskListRef = push(taskListRef);
    set(newTaskListRef, { task: newTask.task, completed: false });

    // Clear the task field after submission
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
          className="mr-2 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
