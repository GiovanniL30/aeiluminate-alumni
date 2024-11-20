import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

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
 *
 * Get comment and like count of a certail post
 */
export const getPostStats = (postId) => {
  const query = `
    SELECT 
        p.postID, 
        u.username AS posted_by,
        u.profile_picture AS profile_link,
        COUNT(DISTINCT l.userID) AS total_likes, 
        COUNT(DISTINCT c.commentID) AS total_replies
    FROM 
        posts p
    LEFT JOIN 
        likes l ON p.postID = l.postID
    LEFT JOIN 
        comments c ON p.postID = c.postID
    LEFT JOIN 
        users u ON p.userID = u.userID
    WHERE 
        p.postID = ?
    GROUP BY 
        p.postID, u.username
`;

  return new Promise((resolve, reject) => {
    connection.query(query, [postId], (error, result) => {
      if (error) {
        console.error("Failed to get post comment and like count");
        reject(error);
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
export const getPosts = (page, pageSize, userId) => {
  const query = "SELECT * FROM posts WHERE userID != ? LIMIT ? OFFSET ?";
  const offset = (page - 1) * pageSize;

  return new Promise((resolve, reject) => {
    connection.query(query, [userId, parseInt(pageSize), parseInt(offset)], (err, results) => {
      if (err) {
        console.error(err);
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
