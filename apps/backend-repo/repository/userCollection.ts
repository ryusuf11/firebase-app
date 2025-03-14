import type { User } from "@repo/shared";
import { db } from "../config/firebaseConfig";

export const updateUserData = async (userId: string, userData: User) => {
  await db.collection("USERS").doc(userId).set(userData, { merge: true });
};

export const fetchUserData = async (userId: string): Promise<User> => {
  const doc = await db.collection("USERS").doc(userId).get();
  return doc.data() as User;
};
