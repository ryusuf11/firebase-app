import type { User } from "@repo/shared";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../entities/request";
import { fetchUserData, updateUserData } from "../repository/userCollection";

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid || "";
    const userData: User = req.body;

    await updateUserData(userId, userData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid || "";
    const userData = await fetchUserData(userId);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};
