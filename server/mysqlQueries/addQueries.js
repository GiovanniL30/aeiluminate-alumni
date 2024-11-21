import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

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
 * Like a new post
 * @affectedDatabase = likes
 */
export const addLike = (postID, userID) => {
  const query = "INSERT INTO likes (postID, userID, likedAt) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(query, [postID, userID, new Date()], (err, result) => {
      if (err) {
        console.error("Error inserting new like", err);
        return reject(new Error("Failed to insert new like into the database"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Follow a user
 * @affectedDatabase = follower
 */
export const followUser = (followerID, followedID) => {
  const query = "INSERT INTO follows (followerID, followedID, followedAt) VALUES (? ,?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(query, [followerID, followedID, new Date()], (err, result) => {
      if (err) {
        console.error("Error following a user", err);
        return reject(new Error("Failed to follow"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Add a comment
 * @affectedDatabase = comment
 */
export const addComment = (commentID, content, postID, userID) => {
  const query = "INSERT INTO comments (commentID, content, createdAt, postID, userID) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(query, [commentID, content, new Date(), postID, userID], (err, result) => {
      if (err) {
        console.error("Error adding a comment", err);
        return reject(new Error("Failed to comment"));
      }
      resolve(result.affectedRows > 0);
    });
  });
};
