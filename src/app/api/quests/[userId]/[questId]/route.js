// Delete quest
import admin from "firebase-admin";

if (!admin.apps.length) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });
}

export async function DELETE(request, context) {
  const { params } = context;
  const { userId, questId } = params;

  const taskRef = admin
    .database()
    .ref(`users/${params.userId}/quests/${params.questId}`);

  try {
    await new Promise((resolve, reject) => {
      taskRef.remove((error) => {
        if (error) {
          reject(new Error("Quest could not be deleted!"));
        } else {
          resolve();
        }
      });
    });
    return Response.json(
      { message: "Quest deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
