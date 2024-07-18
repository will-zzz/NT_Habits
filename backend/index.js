const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const fetch = require("node-fetch");

// Initialize Firebase Admin SDK
const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: process.env.DATABASE_URL,
});

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());

// Add new task
app.post("/api/tasks/:userId", (req, res) => {
  const { userId } = req.params;
  const newTask = req.body;

  const tasksRef = admin.database().ref(`users/${userId}/tasks`);
  const newTaskRef = tasksRef.push();

  newTaskRef.set(newTask, (error) => {
    if (error) {
      console.error("Error adding new task:", error);
      res.status(500).json({ error: "Error adding new task" });
    } else {
      res.json({ id: newTaskRef.key, ...newTask });
    }
  });
});

// Update task
app.put("/api/tasks/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;
  const updatedTask = req.body;

  const taskRef = admin.database().ref(`users/${userId}/tasks/${taskId}`);
  taskRef.update(updatedTask, (error) => {
    if (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    } else {
      res.json({ id: taskId, ...updatedTask });
    }
  });
});

// Update user's displayName
app.put("/api/update-name/:userId", (req, res) => {
  const { userId } = req.params;
  const { displayName } = req.body;

  const userRef = admin.database().ref(`users/${userId}`);
  userRef.update({ displayName }, (error) => {
    if (error) {
      console.error("Error updating name:", error);
      res.status(500).json({ error: "Error updating name" });
    } else {
      res.json({ message: "Name updated successfully!" });
    }
  });
});

// Delete task
app.delete("/api/tasks/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;

  const taskRef = admin.database().ref(`users/${userId}/tasks/${taskId}`);
  taskRef.remove((error) => {
    if (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    } else {
      res.json({ message: "Task deleted successfully!" });
    }
  });
});

// Delete quest task
app.delete("/api/quests/tasks/:userId/:questId/:taskId", (req, res) => {
  const { userId, questId, taskId } = req.params;

  const taskRef = admin
    .database()
    .ref(`users/${userId}/quests/${questId}/tasks/${taskId}`);
  taskRef.remove((error) => {
    if (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    } else {
      res.json({ message: "Task deleted successfully!" });
    }
  });
});

// Delete quest
app.delete("/api/quests/:userId/:questId", (req, res) => {
  const { userId, questId } = req.params;

  const questRef = admin.database().ref(`users/${userId}/quests/${questId}`);
  questRef.remove((error) => {
    if (error) {
      console.error("Error deleting quest:", error);
      res.status(500).json({ error: "Error deleting quest" });
    } else {
      res.json({ message: "Quest deleted successfully!" });
    }
  });
});

// Update user's timezone at login
app.post("/api/update-timezone/", async (req, res) => {
  const { uid, timezone } = req.body;

  const userRef = admin.database().ref(`users/${uid}`);
  userRef.update({ timezone }, (error) => {
    if (error) {
      console.error("Error updating timezone:", error);
      res.status(500).json({ error: "Error updating timezone" });
    } else {
      res.json({ message: "Timezone updated successfully!" });
    }
  });
});

// Function to check if all tasks are complete
const areAllTasksComplete = (tasks) => {
  return tasks.every((task) => task.completed);
};

// Handle the claim button functionality
app.post("/api/claim-rewards", async (req, res) => {
  const { uid, year, month, day } = req.body;

  const isNextDay = async () => {
    const userRef = admin.database().ref(`users/${uid}`);
    const userSnapshot = await userRef.once("value");
    const userData = userSnapshot.val();
    const lastRecordedDay = userData.lastRecordedDay || "0000-00-00";
    // break up "YYYY-MM-DD" into [YYYY, MM, DD] and turn to number
    const lastRecordedDayArr = lastRecordedDay.split("-").map(Number);

    // check if date is at least one day after last recorded day
    if (lastRecordedDayArr[0] > year) {
      return false;
    }
    if (lastRecordedDayArr[1] > month) {
      return false;
    }
    if (lastRecordedDayArr[2] >= day) {
      return false;
    }
    return true;
  };

  try {
    // Implement the logic to fetch the user's tasks from the database
    // Example using the Firebase admin SDK:
    const userTasksRef = admin.database().ref(`users/${uid}/tasks`);
    const userTasksSnapshot = await userTasksRef.once("value");
    const userTasks = userTasksSnapshot.val();

    // Check if all tasks are complete
    const allTasksComplete = areAllTasksComplete(Object.values(userTasks));
    // Check if at least next day
    const nextDay = await isNextDay();

    if (!nextDay) {
      // If not at least next day, return an error response
      res.status(400).json({ error: "Not at least next day." });
    } else if (allTasksComplete) {
      // Increment the user's "Points" by one
      const userRef = admin.database().ref(`users/${uid}`);
      const userSnapshot = await userRef.once("value");
      const userData = userSnapshot.val();
      const points = userData && userData.points ? userData.points + 1 : 1;
      await userRef.update({ points });
      // Update the user's last recorded day
      await userRef.update({ lastRecordedDay: `${year}-${month}-${day}` });

      // Return a success response
      res.status(200).json({ message: "Rewards claimed successfully." });
    } else {
      // If not all tasks are complete, return an error response
      res.status(400).json({ error: "Not all tasks are complete." });
    }
  } catch (error) {
    console.error("Error claiming rewards:", error);
    res.status(500).json({ error: "Failed to claim rewards." });
  }
});

// Update tasks
app.put("/api/update-tasks/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;
  const updatedTask = req.body;

  const taskRef = admin.database().ref(`users/${userId}/tasks/${taskId}`);
  taskRef.update(updatedTask, (error) => {
    if (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    } else {
      res.json({ id: taskId, ...updatedTask });
    }
  });
});

// Update quest tasks
app.put("/api/update-quest-tasks/:userId/:questId/:taskId", (req, res) => {
  const { userId, questId, taskId } = req.params;
  const updatedTask = req.body;

  const taskRef = admin
    .database()
    .ref(`users/${userId}/quests/${questId}/tasks/${taskId}`);
  taskRef.update(updatedTask, (error) => {
    if (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    } else {
      res.json({ id: taskId, ...updatedTask });
    }
  });
});

// Fetch citizen images
app.get("/api/citizen/:season/:id", async (req, res) => {
  const { season, id } = req.params;
  const url = `https://raw.seadn.io/files/50fb6747ce9c4f735171282aac19c4fa.svg`;
  // Fetch the citizen image from web, then console log the hrefs embedded in the svg
  const response = await fetch(url);
  const text = await response.text();
  const hrefs = text.match(/href="([^"]*)"/g).map((href) => href.slice(6, -1));
  // console.log(hrefs);
  res.send(hrefs);
});

// Add new quest
app.post("/api/quests/:userId", (req, res) => {
  const { userId } = req.params;
  const newQuest = req.body;

  const questsRef = admin.database().ref(`users/${userId}/quests`);
  const newQuestRef = questsRef.push();

  newQuestRef.set(newQuest, (error) => {
    if (error) {
      console.error("Error adding new Quest:", error);
      res.status(500).json({ error: "Error adding new Quest" });
    } else {
      res.json({ id: newQuestRef.key, ...newQuest });
    }
  });
});

// Add new quest task
app.post("/api/quests/tasks/:userId/:questId", (req, res) => {
  const { userId, questId } = req.params;
  const newTask = req.body;

  const tasksRef = admin
    .database()
    .ref(`users/${userId}/quests/${questId}/tasks`);
  const newTaskRef = tasksRef.push();

  newTaskRef.set(newTask, (error) => {
    if (error) {
      console.error("Error adding new Task:", error);
      res.status(500).json({ error: "Error adding new Task" });
    } else {
      res.json({ id: newTaskRef.key, ...newTask });
    }
  });
});

// Update quest task
app.put("/api/quests/tasks/:userId/:questId/:taskId", (req, res) => {
  const { userId, questId, taskId } = req.params;
  const updatedTask = req.body;

  const taskRef = admin
    .database()
    .ref(`users/${userId}/quests/${questId}/tasks/${taskId}`);
  taskRef.update(updatedTask, (error) => {
    if (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    } else {
      res.json({ id: taskId, ...updatedTask });
    }
  });
});

const utcOffsets = [
  "-12:00",
  "-11:00",
  "-10:00",
  "-09:30",
  "-09:00",
  "-08:00",
  "-07:00",
  "-06:00",
  "-05:00",
  "-04:00",
  "-03:30",
  "-03:00",
  "-02:00",
  "-01:00",
  "-00:00",
  "+00:00",
  "+01:00",
  "+02:00",
  "+03:00",
  "+03:30",
  "+04:00",
  "+04:30",
  "+05:00",
  "+05:30",
  "+05:45",
  "+06:00",
  "+06:30",
  "+07:00",
  "+08:00",
  "+08:45",
  "+09:00",
  "+09:30",
  "+10:00",
  "+10:30",
  "+11:00",
  "+12:00",
  "+12:45",
  "+13:00",
  "+14:00",
];

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
