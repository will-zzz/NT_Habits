import React, { useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import axios from "axios";

const Quest = ({ quest, user }) => {
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
        <div className="flex items-center justify-between">
          <h2 className="text-white">{quest.quest}</h2>
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
                      //   handleDeleteTask={handleDeleteTask}
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
