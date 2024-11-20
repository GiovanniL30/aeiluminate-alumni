import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

/**
 * ===================== CREATE =====================
 */

/**
 * Adds a new user
 * @affectedDatabase = user
 */
export const addNewUser = (userId, role, email, username, password, firstName, middleName, lastName) => {
  const insertUserQuery = `
      INSERT INTO users (userID, role, email, username, password, firstName, middleName, lastName) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  return new Promise((resolve, reject) => {
    connection.query(insertUserQuery, [userId, role, email, username, password, firstName, middleName, lastName], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return reject(new Error("Failed to insert new user into the database"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Adds a new alumni
 * @affectedDatabase = alumni
 */
export const addNewAlumni = (userID, yeaGraduated, programID, isEmployed) => {
  const insertUserQuery = `
      INSERT INTO alumni (userID, year_graduated, programID, isEmployed) 
      VALUES (?, ?, ?, ?)
    `;

  return new Promise((resolve, reject) => {
    connection.query(insertUserQuery, [userID, yeaGraduated, programID, isEmployed], (err, result) => {
      if (err) {
        console.error("Error inserting new alumni", err);
        return reject(new Error("Failed to insert new almuni into the database"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Adds a new post
 * @affectedDatabase = posts
 */
export const addNewPost = (postId, userID, caption, time) => {
  const query = "INSERT INTO posts (postId, userID, caption, createdAt) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(query, [postId, userID, caption, time], (err, result) => {
      if (err) {
        console.error("Error inserting new post", err);
        return reject(new Error("Failed to insert new post into the database"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Adds a new media
 * @affectedDatabase = media
 */
export const addNewMedia = (mediaID, mediaType, mediaURL, uploadedAt, postID) => {
  const query = "INSERT INTO media (mediaID, mediaType, mediaURL,uploadedAt, postID) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(query, [mediaID, mediaType, mediaURL, uploadedAt, postID], (err, result) => {
      if (err) {
        console.error("Error inserting new media", err);
        return reject(new Error("Failed to insert new media into the database"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * ===================== READ =====================
 */

/**
 *
 * Validate email and password
 */
export const validateEmailAndPassword = (email, password) => {
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  return new Promise((resolve, reject) => {
    connection.query(query, [email, password], (error, result) => {
      if (error) {
        console.error("Failed to check email and password:", error);
        reject(error);
        return;
      }

      if (result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 *
 * Get a specific user on the database
 */
export const getUser = (id) => {
  const query = "SELECT * FROM users WHERE userID = ?";

  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if (error) {
        console.error("Failed to get user:", error);
        reject(error);
        return;
      }

      if (result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Gets all list of programs
 */
export const getPrograms = () => {
  const query = "SELECT * FROM academic_programs";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.error("Failed to get programs");
        reject(error);
      }

      resolve(result);
    });
  });
};

/**
 * Checks if the username is already in the database
 */
export const checkUsername = (username) => {
  const query = "SELECT COUNT(*) as users FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    connection.query(query, [username], (err, results) => {
      if (err) {
        console.error("Failed to check username");
        return reject(false);
      }
      resolve(results[0].users > 0);
    });
  });
};

/**
 * Checks if the email is already in the database
 */
export const checkEmail = (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  return new Promise((resolve, reject) => {
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error("Failed to check email");
        return reject(false);
      }
      resolve(results.length > 0);
    });
  });
};

/**
 * Fetches paginated users and total count from the database.
 */
export const getUsers = (page, pageSize) => {
  const query = "SELECT * FROM users LIMIT ? OFFSET ?";
  const offset = (page - 1) * pageSize;

  return new Promise((resolve, reject) => {
    connection.query(query, [parseInt(pageSize), parseInt(offset)], (err, results) => {
      if (err) {
        return reject("Error fetching paginated users");
      }

      connection.query("SELECT COUNT(*) AS total FROM users", (err, countResult) => {
        if (err) {
          return reject("Error fetching total user count");
        }

        const totalCount = countResult[0].total;
        resolve({ users: results, total: totalCount });
      });
    });
  });
};

/**
 * Fetches paginated posts and total count from the database.
 */
export const getPosts = (page, pageSize) => {
  const query = "SELECT * FROM posts LIMIT ? OFFSET ?";
  const offset = (page - 1) * pageSize;

  return new Promise((resolve, reject) => {
    connection.query(query, [parseInt(pageSize), parseInt(offset)], (err, results) => {
      if (err) {
        return reject("Error fetching paginated posts");
      }

      connection.query("SELECT COUNT(*) AS total FROM posts", (err, countResult) => {
        if (err) {
          return reject("Error fetching total post count");
        }

        const totalCount = countResult[0].total;
        resolve({ posts: results, total: totalCount });
      });
    });
  });
};

/**
 *
 * Get all list of media files of a post
 */
export const getMedia = (postId) => {
  const query = "SELECT mediaID, mediaURL, mediaType FROM media WHERE postID = ?";

  return new Promise((resolve, reject) => {
    connection.query(query, [postId], (err, results) => {
      if (err) {
        return reject("Failed to get media of the post");
      }

      resolve(results);
    });
  });
};

/**
 * ===================== UPDATE =====================
 */

/**
 * ===================== DELETE =====================
 */

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
