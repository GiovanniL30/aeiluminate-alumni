import { addNewJobListing } from "../mysqlQueries/addQueries.js";
import crypto from "crypto";
import { deleteJobListing } from "../mysqlQueries/deleteQueries.js";
import { checkIfUserJobPost, getJobListings } from "../mysqlQueries/readQueries.js";

/**
 *
 * Delete a joblisting
 *
 *
 * @method DELETE
 * @route /api/listings/:id
 */
export const deleteJobListingController = async (req, res) => {
  try {
    const { role, userId } = req;
    const { id } = req.params;

    const { isOwner } = await checkIfUserJobPost(userId, id);

    if (!isOwner) {
      throw new Error("You cannot delete others event");
    }

    if (role !== "Admin" && role !== "Manager") {
      throw new Error("Only admin and Manager can do this operation");
    }

    const result = await deleteJobListing(id);

    if (!result) throw new Error("Failed to delete Job Listing");
    res.json({ message: "Job Listing deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * Add  a new joblisting
 *
 *
 * @method POST
 * @route /api/listings
 */
export const uploadNewJoblistingController = async (req, res) => {
  try {
    const { userId, role } = req;

    if (role !== "Admin" && role !== "Manager") {
      throw new Error("Only admin and Manager can upload a job listing");
    }

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
};

/**
 *
 * Get all job listings
 *
 *
 * @method GET
 * @route /api/listings
 */
export const getJobListingsController = async (req, res) => {
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
};
