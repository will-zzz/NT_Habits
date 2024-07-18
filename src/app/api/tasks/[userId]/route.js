// Add task
import admin from "firebase-admin";

if (!admin.apps.length) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });
}

export async function POST(request, context) {
  const { params } = context;
  const newTask = await request.json();

  // console.log("params", params);
  // console.log("newTask", newTask);

  const tasksRef = admin.database().ref(`users/${params.userId}/tasks`);
  const newTaskRef = tasksRef.push();

  try {
    await new Promise((resolve, reject) => {
      newTaskRef.set(newTask, (error) => {
        if (error) {
          console.error("Error adding new task:", error);
          reject({ error: "Error adding new task" });
        } else {
          resolve({ id: newTaskRef.key, ...newTask });
        }
      });
    });
    return Response.json({ id: newTaskRef.key, ...newTask }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
