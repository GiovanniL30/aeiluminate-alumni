import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as loginRoute } from "./routes/login.js";
import { router as registerRoute } from "./routes/register.js";
import { router as usersRoute } from "./routes/users.js";
import { router as programsRoute } from "./routes/programs.js";
import { postRouter } from "./routes/post.js";
import { authenticateUserCookie } from "./middleware/authenticateCookie.js";
import { getUser } from "./mysqlQueries/readQueries.js";

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

app.use("/api/check_token", authenticateUserCookie, async (req, res) => {
  const { userId } = req;

  try {
    const user = await getUser(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = user;
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api", usersRoute);
app.use("/api", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api", postRouter);

const PORT = process.env.PORT || 1099;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
