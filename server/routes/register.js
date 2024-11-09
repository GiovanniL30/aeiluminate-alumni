import express from "express";
import appWriteInstance from "../appwriteconfig.js";
import { ID } from "appwrite";

export const router = express.Router();

const account = appWriteInstance.getAccount();

router.post("/client", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res
      .status(400)
      .json({ message: "Bad request body (missing fields)" });

  try {
    const user = await account.create(ID.unique(), email, password, username);

    res.json({ userId: user });
  } catch (error) {
    console.error("Error creating user:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
});
