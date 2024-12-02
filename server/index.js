import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import "dotenv/config";

import { router as registerRoute } from "./routes/register.js";
import { router as usersRoute } from "./routes/users.js";
import { postRouter } from "./routes/post.js";
import { programRouter } from "./routes/programs.js";
import { applicationRoute } from "./routes/application.js";
import { conversationRoute } from "./routes/conversation.js";

const app = express();
const httpServer = createServer(app);

/**
 * ======================
 *    MIDDLEWARES
 * =======================
 */
app.use(
  cors({
    origin: process.env.ENDPOINT,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * ======================
 *   ROUTES
 * =======================
 */
app.use("/api", usersRoute);
app.use("/api/register", registerRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api", postRouter);
app.use("/api", programRouter);
app.use("/api", applicationRoute);

/**
 * ======================
 *   SOCKET IO
 * =======================
 */

const users = new Map();

const addUser = (userId, socketId) => {
  users.set(userId, socketId);
};

const removeUser = (userId) => {
  users.delete(userId);
};

const io = new SocketIO(httpServer, {
  cors: {
    origin: process.env.ENDPOINT,
  },
});

io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    addUser(userId, socket.id);
    console.log(`A user connected: userId: ${userId} socketId: ${socket.id}`);
  });

  socket.on("unregister", (userId) => {
    removeUser(userId);
    console.log(`User disconnected: userId: ${userId} socketId: ${socket.id}`);
  });
});

/**
 * ======================
 *   STARTING THE SERVER
 * =======================
 */
const PORT = process.env.PORT || 1099;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
