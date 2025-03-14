import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import router from "../routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

export const api = functions.https.onRequest(app);
