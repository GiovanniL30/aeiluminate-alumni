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
    if (!req.files || req.files.length < 2) {
      return res.status(422).json({ message: "Both diploma and school ID images are required." });
    }

    for (const file of req.files) {
      const isValidType = ["image/jpeg", "image/png"].includes(file.mimetype);
      if (!isValidType) {
        return res.status(422).json({ message: `Invalid file type: ${file.originalname}` });
      }
      if (file.size > 5 * 1024 * 1024) {
        return res.status(422).json({ message: `File size too large: ${file.originalname}` });
      }
    }

    const mediaInfo = [];
    for (const file of req.files) {
      const result = await storage.createFile(process.env.APP_WRITE_IMAGES_BUCKET, ID.unique(), InputFile.fromBuffer(file.buffer, file.originalname));
      const mediaURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view?project=${process.env.APP_WRITE_PROJECT_ID}&mode=admin`;
      mediaInfo.push(mediaURL);
    }

    const newApplication = await addApplication(applicationId, mediaInfo[0], mediaInfo[1], userId);

    if (!newApplication) {
      await removeUserAccount(userId);
      return res.status(500).json({ message: "Failed to create application. UserPosts account removed." });
    }

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
      message: "Application submitted successfully.",
      applicationId,
    });
  } catch (error) {
    console.error("Error in application submission:", error.message || error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};
