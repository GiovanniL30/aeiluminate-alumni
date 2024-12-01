import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

export const updateProfile = (userId, firstName, lastName, userName, company, jobRole, bio, phoneNumber) => {
  const query = `
    UPDATE users 
    SET 
        firstName = ?, middleName = ?, lastName = ?, username = ? , company = ?, job_role = ?, bio = ?, profile_picture = ?, phoneNumber = ?
    WHERE (userID = ?)`;
};
