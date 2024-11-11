import connection from "./connections.js";
import { account } from "./appwriteconfig.js";

/**
 *
 *  Checks if the username is already on the database
 */
export const checkUsername = (username, callback) => {
  const query = "SELECT COUNT(*) as users FROM users WHERE username = ?";

  connection.query(query, [username], (err, results) => {
    if (err) {
      return callback(false);
    }

    callback(results[0].users > 0);
  });
};

/**
 *
 * Removes an account on the user table
 */
export const removeUserAccount = async (userId, callback) => {
  try {
    await account.deleteIdentity(userId);

    const query = "DELETE FROM users WHERE userID = ?";
    connection.query(query, [userId], (err, result) => {
      if (err) {
        return callback(false, "Error removing user from database");
      }

      if (result.affectedRows > 0) {
        callback(
          true,
          "Successfully removed the user from Appwrite and database"
        );
      } else {
        callback(false, "User not found or failed to remove from the database");
      }
    });
  } catch (error) {
    console.error("Error removing user from Appwrite:", error.message);
    callback(false, "Error removing user from Appwrite");
  }
};
