import { removeUserAccount } from "../mysqlQueries/deleteQueries.js";
import { applicationEmail, transporter } from "../mail.js";
import { addApplication } from "../mysqlQueries/addQueries.js";
import crypto from "crypto";
import { storage } from "../appwriteconfig.js";
import { ID, InputFile } from "node-appwrite";

/**
 *
 * Inserts a new application on the Database
 *
 * @method POST
 * @route /api/apply
 * @author Giovanni Leo
 */
export const createApplicationController = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    return res.status(400).json({ message: "UserPosts ID is missing. Ensure the user creation step is successful." });
  }

  const applicationId = crypto.randomUUID();

  try {
    transporter.sendMail(
      applicationEmail(req.body.email, applicationId, req.body.roleType, req.body.firstName, req.body.lastName, req.body.middleName),
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result.response);
        }
      }
    );

    res.status(201).json({
      message: "Account Created",
      applicationId,
    });
  } catch (error) {
    console.error("Error in application submission:", error.message || error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};
