import express from "express";
import { getUser, updateUser } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware as express.RequestHandler);

router.get("/fetch-user-data", getUser);
router.put("/update-user-data", updateUser);

export default router;
