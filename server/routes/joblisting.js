import express from "express";
import { getJobListings } from "../mysqlQueries/readQueries.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { addNewJobListing } from "../mysqlQueries/addQueries.js";
import crypto from "crypto";

export const joblistingRoute = express.Router();

joblistingRoute.get("/", authenticateUserToken, async (req, res) => {
  try {
    const { userId } = req;
    const { page, length } = req.query;

    const { listings, total } = await getJobListings(page, length, userId);

    const totalPage = Math.ceil(total / length);

    res.status(200).json({
      jobs: listings,
      totalJobs: total,
      totalPage,
    });
  } catch (error) {
    console.error("Error in getting events:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

joblistingRoute.post("/", authenticateUserToken, async (req, res) => {
  try {
    const { userId } = req;

    const { jobTitle, company, experienceRequired, workType, salary, description, url } = req.body;

    const result = await addNewJobListing(
      crypto.randomUUID(),
      jobTitle,
      company,
      experienceRequired,
      workType,
      salary,
      description,
      new Date(),
      userId,
      url
    );

    if (!result) throw new Error("Failed to add job listing");
    res.json({ message: "Added job listing" });
  } catch (error) {
    console.error("Error adding new job litsing:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});