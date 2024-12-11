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
import { albumRouter } from "./routes/album.js";
import { passwordRecoveryRoute } from "./routes/passwordRecovery.js";

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
app.use("/api/album", albumRouter);
app.use("/api/recover", passwordRecoveryRoute);

/**
 * ======================
 *   SOCKET IO
 * =======================
 */

const users = {};

const addUser = (userId, socketId) => {
  users[userId] = socketId;
  io.emit("onlineUsers", Object.keys(users));
};

const removeUser = (userId) => {
  delete users[userId];
  io.emit("onlineUsers", Object.keys(users));
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

  socket.on("sendMessage", (data) => {
    console.log("Message data received:", data);

    const receiverSocketId = users[data.receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", data);
      console.log(`Message sent to ${data.receiverId}:`, data);
    } else {
      console.log("Receiver not connected.");
    }
  });

  console.log(users);
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
