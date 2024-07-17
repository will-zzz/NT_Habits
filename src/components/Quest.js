import React, { useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import axios from "axios";

const Quest = ({ quest, user, handleDeleteQuest }) => {
  const [expanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [user.uid]);

  // Firebase
  const fetchTasks = async () => {
    const tasksRef = ref(
      database,
      `users/${user.uid}/quests/${quest.id}/tasks`
    );
    const tasksSnapshot = await get(tasksRef);
    const tasksData = tasksSnapshot.val() || [];
    // Order tasks by task.order (0, 1, 2...)
    const taskList = Object.entries(tasksData)
      .sort((a, b) => a[1].order - b[1].order)
      .map((task) => ({ id: task[0], ...task[1] }));
    setTasks(taskList);
  };

  const handleDropdownClick = () => {
    setExpanded(!expanded);
  };

  // Server
  const handleTaskToggle = async (taskId, completed) => {
    try {
      await axios.put(
        `http://localhost:6969/api/quests/tasks/${user.uid}/${quest.id}/${taskId}`,
        {
          completed: !completed,
        }
      );
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
        `http://localhost:6969/api/quests/tasks/${user.uid}/${quest.id}`,
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
        `http://localhost:6969/api/tasks/${user.uid}/${quest.id}/${taskId}`
      );
      // Update the state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Set the new order of the tasks
    const newTasks = [...tasks];
    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, tasks[source.index]);
    setTasks(newTasks);

    // Update the order child of each task in database
    // Layout: { id: { task: "task", completed: false, order: 0 } }
    newTasks.forEach(async (task, index) => {
      try {
        await axios.put(
          `http://localhost:6969/api/update-quest-tasks/${user.uid}/${quest.id}/${task.id}`,
          {
            order: index,
          }
        );
      } catch (error) {
        console.error("Error updating task order:", error);
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="border border-white p-2 mb-2">
        <div className="flex items-center justify-between text-white">
          <h2 className="flex-grow overflow-ellipsis overflow-hidden text-inherit">
            {quest.quest}
          </h2>
          {/* Delete button */}
          <button
            className="mr-2 text-inherit"
            onClick={() => {
              handleDeleteQuest(quest.id);
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
          <button
            onClick={handleDropdownClick}
            className="bg-transparent text-white outline-none"
          >
            {expanded ? "-" : "+"}
          </button>
        </div>
        {expanded && (
          <>
            <Droppable droppableId={"0"}>
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="ml-4 mt-2"
                >
                  {tasks.map((task, index) => (
                    <ListItem
                      key={task.id}
                      task={task}
                      index={index}
                      handleDeleteTask={handleDeleteTask}
                      handleTaskToggle={handleTaskToggle}
                      questId={quest.id}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {/* New Task Button */}
            <form
              onSubmit={handleAddTask}
              className="flex items-center justify-between bg-transparent border border-white p-1"
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
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default Quest;
