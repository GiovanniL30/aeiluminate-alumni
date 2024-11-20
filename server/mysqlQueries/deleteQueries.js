import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

/**
 * Removes an account from the user table
 * @affectedDatabase = user
 */
export const removeUserAccount = async (userId) => {
  try {
    // Delete the user from Appwrite
    await users.delete(userId);

    const query = "DELETE FROM users WHERE userID = ?";

    return new Promise((resolve, reject) => {
      connection.query(query, [userId], (err, result) => {
        if (err) {
          return reject(false);
        }

        resolve(result.affectedRows > 0);
      });
    });
  } catch (error) {
    console.error("Error removing user from Appwrite:", error.message);
    throw new Error("Error removing user from Appwrite");
  }
};
