import React from "react";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import axios from "axios";

const Dailies = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [user.uid]);

  // Firebase
  const fetchTasks = async () => {
    const tasksRef = ref(database, `users/${user.uid}/tasks`);
    const tasksSnapshot = await get(tasksRef);
    const tasksData = tasksSnapshot.val() || [];
    const taskList = Object.keys(tasksData).map((taskId) => ({
      id: taskId,
      ...tasksData[taskId],
    }));
    setTasks(taskList);
  };

  // Server
  const handleTaskToggle = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:6969/api/tasks/${user.uid}/${taskId}`, {
        completed: !completed,
      });
      // Update the state to reflect the toggled task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Server
  const handleAddTask = async (e) => {
    e.preventDefault();

    // Check if newTask is not empty or just whitespace
    if (newTask.trim() === "") {
      // Don't submit blank task
      return;
    }

    const newTaskToAdd = { task: newTask, completed: false };
    try {
      const response = await axios.post(
        `http://localhost:6969/api/tasks/${user.uid}`,
        newTaskToAdd
      );
      // Update the state to include the new task with its ID
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: response.data.id, ...newTaskToAdd },
      ]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  // Server
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:6969/api/tasks/${user.uid}/${taskId}`
      );
      // Update the state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-600 border border-white p-1">
      {/* Your content for Dailies component */}
      <ul className="overflow-y-auto max-h-[calc(100vh-17rem)]">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            task={task}
            handleTaskToggle={handleTaskToggle}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>

      {/* New Task Button */}
      <form
        onSubmit={handleAddTask}
        // fixed at bottom, like a footer
        className="flex items-center justify-between bg-transparent border border-white p-2 sticky bottom-0"
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="ADD TASK"
          className="bg-transparent text-white flex-grow outline-none px-2 min-w-0"
        />
        <button
          type="submit"
          // Put plus sign inside button on right
          className="bg-transparent text-white outline-none"
        >
          <span className="text-2xl">+</span>
        </button>
      </form>
    </div>
  );
};

export default Dailies;
