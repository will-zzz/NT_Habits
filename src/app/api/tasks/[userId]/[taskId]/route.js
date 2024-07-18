// Update task
import admin from "firebase-admin";

if (!admin.apps.length) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });
}

export async function PUT(request, context) {
  const { params } = context;
  const updatedTask = await request.json();

  const taskRef = admin
    .database()
    .ref(`users/${params.userId}/tasks/${params.taskId}`);
  try {
    await new Promise((resolve, reject) => {
      taskRef.update(updatedTask, (error) => {
        if (error) {
          console.error("Error updating task:", error);
          reject(new Error("Error updating task"));
        } else {
          resolve();
        }
      });
    });
    return Response.json(
      { id: params.taskId, ...updatedTask },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Delete task

export async function DELETE(request, context) {
  const { params } = context;

  const taskRef = admin
    .database()
    .ref(`users/${params.userId}/tasks/${params.taskId}`);
  try {
    await new Promise((resolve, reject) => {
      taskRef.remove((error) => {
        if (error) {
          console.error("Error deleting task:", error);
          reject(new Error("Error deleting task"));
        } else {
          resolve();
        }
      });
    });
    return Response.json(
      { message: "Task deleted successfull!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
