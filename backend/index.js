const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
