import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import { router as registerRoute } from "../routes/register.js";
import { router as usersRoute } from "../routes/users.js";
import { postRouter } from "../routes/post.js";

const app = express();

app.use(
  cors({
    origin: process.env.ENDPOINT,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", usersRoute);
app.use("/api/register", registerRoute);
app.use("/api", postRouter);

const PORT = process.env.PORT || 1099;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
