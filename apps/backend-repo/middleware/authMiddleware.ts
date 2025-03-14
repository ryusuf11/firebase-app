import type { Response, NextFunction } from "express";
import { admin } from "../config/firebaseConfig";
import type { AuthenticatedRequest } from "../entities/request";

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
