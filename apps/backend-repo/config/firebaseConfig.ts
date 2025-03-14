import path from "node:path";
import * as admin from "firebase-admin";
import { cert } from "firebase-admin/app";

const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
);

admin.initializeApp({
  credential: cert(serviceAccountPath),
});

const db = admin.firestore();

export { admin, db };
