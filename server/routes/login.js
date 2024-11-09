import express from "express";
import jwt from "jsonwebtoken";

export const router = express.Router();

const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.secret_key, {
    expiresIn: "86400s",
  });
};

router.post("/admin", (req, res) => {
  const { username, password } = req.body;

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUsername = process.env.ADMIN_USERNAME;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password not provided" });

  if (password != adminPassword || username != adminUsername)
    return res
      .status(401)
      .json({ message: "Username or Password is incorrect" });

  const token = generateAccessToken(username);
  res.cookie("admin_token", token, { httpOnly: true, secure: true });
  res.status(200).json({ message: "Logged in" });
});
