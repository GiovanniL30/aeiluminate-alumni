import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as loginRoute } from "./routes/login.js";
import { router as registerRoute } from "./routes/register.js";
import { authenticateCookie } from "./middleware/authenticateCookie.js";
import { Client, Account } from "appwrite";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
