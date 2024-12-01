import { addNewAlumni, addNewUser } from "../mysqlQueries/addQueries.js";
import { checkEmail, checkUsername, getApplication } from "../mysqlQueries/readQueries.js";
import { removeUserAccount } from "../mysqlQueries/deleteQueries.js";
import crypto from "crypto";

/**
 *  Creates a new account on the Database (user, alumni) and on Appwrite
 *  @method POST
 *  @route /api/register/client
 */
export const createUserAccountController = async (req, res, next) => {
  const { email, roleType, userName, password, firstName, lastName, middleName, program, yearGraduated, type } = req.body;

  console.log(req.body);

  if (!email || !roleType || !userName || !password || !firstName || !lastName || !middleName || !program || !yearGraduated) {
    return res.status(400).json({ message: "Bad request: Missing required fields." });
  }

  try {
    const emailExists = await checkEmail(email);
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists." });
    }

    if (type.toLowerCase() === "application") {
      const application = await getApplication(email);
      if (application) {
        return res.status(409).json({ message: `Pending application exists: Application ID ${application.appID}` });
      }
    }

    const usernameExists = await checkUsername(userName);
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const id = crypto.randomUUID();

    const newUser = await addNewUser(id, roleType, email, userName, password, firstName, middleName, lastName);
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create a new user in the database." });
    }

    if (roleType.toLowerCase() === "alumni") {
      const alumni = await addNewAlumni(id, yearGraduated, program);
      if (!alumni) {
        await removeUserAccount(id);
        return res.status(500).json({ message: "Failed to add alumni details. User account removed." });
      }
    }

    if (type.toLowerCase() === "application") {
      req.userId = id;
      next();
    } else {
      res.status(201).json({ message: "User created successfully.", userId: id });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error: Failed to create account." });
  }
};
