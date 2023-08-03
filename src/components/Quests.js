import React from "react";
import Quest from "./Quest";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import axios from "axios";

const Quests = ({ user }) => {
  const [quests, setQuests] = useState([]);
  const [newQuest, setNewQuest] = useState("");

  useEffect(() => {
    fetchQuests();
  }, [user.uid]);

  // Firebase
  const fetchQuests = async () => {
    const questsRef = ref(database, `users/${user.uid}/quests`);
    const questsSnapshot = await get(questsRef);
    const questsData = questsSnapshot.val() || [];
    // Order quests by task.order (0, 1, 2...)
    const taskList = Object.entries(questsData)
      .sort((a, b) => a[1].order - b[1].order)
      .map((task) => ({ id: task[0], ...task[1] }));
    setQuests(taskList);
  };

  // Server
  const handleAddQuest = async (e) => {
    e.preventDefault();

    // Check if newQuest is not empty or just whitespace
    if (newQuest.trim() === "") {
      // Don't submit blank quest
      return;
    }

    const newQuestToAdd = { quest: newQuest, completed: false };
    try {
      const response = await axios.post(
        `http://localhost:6969/api/quests/${user.uid}`,
        newQuestToAdd
      );
      // Update the state to include the new task with its ID
      setQuests((prevQuests) => [
        ...prevQuests,
        { id: response.data.id, ...newQuestToAdd },
      ]);
      setNewQuest("");
    } catch (error) {
      console.error("Error adding new quest:", error);
    }
  };

  return (
    <div className="h-full bg-gray-600 border border-white p-1 flex flex-col justify-between">
      <div className="h-full overflow-scroll max-h-[calc(100vh-100vw/4.5-8.4rem)]">
        {/* Quests */}
        {quests.map((quest) => (
          <Quest key={quest.id} quest={quest} user={user} />
        ))}
      </div>
      {/* New Quest Button */}
      <form
        onSubmit={handleAddQuest}
        className="flex items-center justify-between bg-transparent border border-white p-1"
      >
        <input
          type="text"
          value={newQuest}
          onChange={(e) => setNewQuest(e.target.value)}
          placeholder="ADD QUEST"
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

export default Quests;
