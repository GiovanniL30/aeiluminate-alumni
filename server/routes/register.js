import express from "express";
import { account } from "../appwriteconfig.js";
import { ID } from "appwrite";
import { checkUsername, removeUserAccount } from "../utils.js";
import connection from "../connections.js";

export const router = express.Router();

router.post("/client", async (req, res) => {
  const {
    email,
    userName,
    password,
    employment,
    firstName,
    lastName,
    middleName,
    program,
    roleType,
    yearGraduated,
  } = req.body;

  // Check for missing fields
  if (
    !email ||
    !userName ||
    !password ||
    !employment ||
    !firstName ||
    !lastName ||
    !middleName ||
    !program ||
    !roleType ||
    !yearGraduated
  ) {
    return res
      .status(400)
      .json({ message: "Bad request body (missing fields)" });
  }

  try {
    // Check if the username already exists
    checkUsername(userName, async (usernameExists) => {
      if (usernameExists) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // Create the user in Appwrite
      let user;
      try {
        user = await account.create(ID.unique(), email, password, userName);
      } catch (error) {
        console.error("Error creating user in Appwrite:", error.message);
        return res.status(500).json({ message: error.message });
      }

      const insertUserQuery = `
        INSERT INTO users (userID, role, username, password, firstName, middleName, lastName) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      // Insert user in the local database
      connection.query(
        insertUserQuery,
        [
          user.$id,
          roleType,
          userName,
          password,
          firstName,
          middleName,
          lastName,
        ],
        (err) => {
          if (err) {
            console.error("Error inserting user into database:", err.message);
            return res
              .status(500)
              .json({ message: "Error creating user account in database" });
          }

          const insertEmail =
            "INSERT INTO user_details(userid, email) VALUES (?, ?)";

          connection.query(insertEmail, [user.$id, email]);

          // If the user is an alumni, insert into the alumni table
          if (roleType === "Alumni") {
            const insertAlumniQuery = `
              INSERT INTO alumni (isEmployed, programID, userID, year_graduated) 
              VALUES (?, ?, ?, ?)
            `;

            connection.query(
              insertAlumniQuery,
              [employment, program, user.$id, yearGraduated],
              (err) => {
                if (err) {
                  console.error("Error creating alumni record:", err.message);
                  removeUserAccount(user.$id, (result, message) => {
                    console.log(message);
                  });
                  return res
                    .status(500)
                    .json({ message: "Error creating alumni account" });
                }

                return res.status(201).json({
                  message: "Account created successfully",
                  userID: user.$id,
                });
              }
            );
          } else {
            return res.status(201).json({
              message: "Account created successfully",
              userID: user.$id,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("1. Error creating user:", error.message);
    res.status(500).json({ message: error.message });
  }
});
