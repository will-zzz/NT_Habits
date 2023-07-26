import React from "react";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import axios from "axios";

const TaskList = ({ user }) => {
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
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  return (
    <>
      <ul className="my-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <label
              className={`${
                task.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id, task.completed)}
              />
              {task.task}
            </label>
          </li>
        ))}
      </ul>

      {/* New Task Button */}
      <form onSubmit={handleAddTask} className="mt-4">
        <div className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
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
    </>
  );
};

export default TaskList;
