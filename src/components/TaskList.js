import React from "react";
import { useEffect, useState } from "react";
import { ref, push, set, get, onValue, update } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch user's tasks from Firebase when the component mounts
    const taskListRef = ref(database, `users/${user.uid}/tasks`);
    get(taskListRef).then((snapshot) => {
      const taskData = snapshot.val();
    });

    // Set the tasks to the data retrieved from Firebase
    onValue(taskListRef, (snapshot) => {
      const taskData = snapshot.val();
      const taskList = [];
      // here we convert the tasks object into an array
      for (let id in taskData) {
        taskList.push({ id, ...taskData[id] });
      }
      setTasks(taskList);
      console.log(taskList);
    });
  }, [user.uid]);

  const handleTaskToggle = (taskId, completed) => {
    const taskRef = ref(database, `users/${user.uid}/tasks/${taskId}`);
    // set(taskRef, { completed: !completed });
    update(taskRef, { completed: !completed });
  };

  return (
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
  );
};

export default TaskList;
