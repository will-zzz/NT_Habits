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

  // Handle claim rewards
  const handleClaimRewards = async () => {
    try {
      // Get the current date in the user's timezone (formatted as "YYYY-MM-DD")
      const currentDate = new Date(); // Get the current date as a JavaScript Date object

      // Extract the year, month, and day components from the current date
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();

      const response = await axios.post(
        "http://localhost:6969/api/claim-rewards",
        {
          uid: user.uid,
          year: year,
          month: month,
          day: day,
        }
      );
      console.log(response.data.message); // Success message
      fetchTasks(); // Refresh tasks after claiming rewards
    } catch (error) {
      console.error("Error claiming rewards:", error.response.data.error);
      // Handle error here if needed
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
            {/* Red x to delete task */}
            <button
              className="text-red-500"
              onClick={() => {
                handleDeleteTask(task.id);
              }}
            >
              X
            </button>
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
      {/* Claim Rewards Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={handleClaimRewards}
      >
        Claim Rewards
      </button>
    </>
  );
};

export default TaskList;
