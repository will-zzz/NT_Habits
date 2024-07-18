// Add quest
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
  const updatedTask = await request.json();

  const taskRef = admin.database().ref(`users/${params.userId}/quests`);
  try {
    await new Promise((resolve, reject) => {
      taskRef.push(updatedTask, (error) => {
        if (error) {
          console.error("Error adding quest:", error);
          reject(new Error("Error adding quest"));
        } else {
          resolve();
        }
      });
    });
    return Response.json(
      { id: params.questId, ...updatedTask },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
