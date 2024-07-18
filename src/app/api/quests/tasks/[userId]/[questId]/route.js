// Add quest task
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

  const tasksRef = admin
    .database()
    .ref(`users/${params.userId}/quests/${params.questId}/tasks`);
  const newTaskRef = tasksRef.push();

  try {
    await new Promise((resolve, reject) => {
      newTaskRef.set(newTask, (error) => {
        if (error) {
          console.error("Error adding quest task:", error);
          reject(new Error("Error adding quest task"));
        } else {
          resolve();
        }
      });
    });
    return Response.json({ id: newTaskRef.key, ...newTask }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
