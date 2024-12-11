import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

/**
 * Adds a new user
 * @affectedDatabase = user
 */
export const addNewUser = async (userId, role, email, username, password, firstName, middleName, lastName) => {
  const insertUserQuery = `
    INSERT INTO users (userID, role, email, username, password, firstName, middleName, lastName) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await connection.query(insertUserQuery, [userId, role, email, username, password, firstName, middleName, lastName]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new user:", err);
    throw new Error("Failed to insert new user into the database");
  }
};

/**
 * Adds a new alumni
 * @affectedDatabase = alumni
 */
export const addNewAlumni = async (userID, yeaGraduated, programID, isEmployed = 0) => {
  const insertUserQuery = `
    INSERT INTO alumni (userID, year_graduated, programID, isEmployed) 
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await connection.query(insertUserQuery, [userID, yeaGraduated, programID, isEmployed]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new alumni", err);
    throw new Error("Failed to insert new alumni into the database");
  }
};

/**
 * Adds a new post
 * @affectedDatabase = posts
 */
export const addNewPost = async (postId, userID, caption = " ", time, albumId = null) => {
  let query = "INSERT INTO posts (postId, userID, caption, createdAt";
  let values = [postId, userID, caption, time];

  if (albumId) {
    query += ", albumId";
    values.push(albumId);
  }

  query += ") VALUES (? ,? ,? ,?";
  if (albumId) query += ", ?";

  query += ")";

  try {
    const [result] = await connection.query(query, values);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new post", err);
    throw new Error("Failed to insert new post into the database");
  }
};

/**
 * Adds a new media
 * @affectedDatabase = media
 */
export const addNewMedia = async (mediaID, mediaType, mediaURL, uploadedAt, postID) => {
  const query = "INSERT INTO media (mediaID, mediaType, mediaURL, uploadedAt, postID) VALUES (?, ?, ?, ?, ?)";

  try {
    const [result] = await connection.query(query, [mediaID, mediaType, mediaURL, uploadedAt, postID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new media", err);
    throw new Error("Failed to insert new media into the database");
  }
};

/**
 * Like a new post
 * @affectedDatabase = likes
 */
export const addLike = async (postID, userID) => {
  const query = "INSERT INTO likes (postID, userID, likedAt) VALUES (?, ?, ?)";

  try {
    const [result] = await connection.query(query, [postID, userID, new Date()]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new like", err);
    throw new Error("Failed to insert new like into the database");
  }
};

/**
 * Follow a user
 * @affectedDatabase = follower
 */
export const followUser = async (followerID, followedID) => {
  const query = "INSERT INTO follows (followerID, followedID, followedAt) VALUES (?, ?, ?)";

  try {
    const [result] = await connection.query(query, [followerID, followedID, new Date()]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error following a user", err);
    throw new Error("Failed to follow");
  }
};

/**
 * Add a comment
 * @affectedDatabase = comment
 */
export const addComment = async (commentID, content, postID, userID) => {
  const query = "INSERT INTO comments (commentID, content, createdAt, postID, userID) VALUES (?, ?, ?, ?, ?)";

  try {
    const [result] = await connection.query(query, [commentID, content, new Date(), postID, userID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error adding a comment", err);
    throw new Error("Failed to comment");
  }
};

/**
 * Add a new application
 * @affectedDatabase = application
 */
export const addApplication = async (appID, diplomaURL, schoolIdURL, userID) => {
  const query = "INSERT INTO application (appID, diplomaURL, schoolIdURL, userID, createdAt) VALUES (?, ?, ?, ?, ?);";

  try {
    const [result] = await connection.query(query, [appID, diplomaURL, schoolIdURL, userID, new Date()]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error application", err);
    throw new Error("Failed to add application");
  }
};

/**
 * Add a new conversation and the first message.
 * @affectedDatabase = conversation, private_messages
 */
export const createConverstaion = async (conversationID, senderID, receiverID) => {
  const query = "INSERT INTO conversation (conversationID, memberOne, memberTwo, createdAt) VALUES (?, ?, ?, ?)";

  try {
    const [result] = await connection.query(query, [conversationID, senderID, receiverID, new Date()]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error in createConverstaion:", err);
    throw new Error("Failed to create new conversation");
  }
};

/**
 * Add a new message to the conversation
 */
export const addNewMessage = async (messageID, conversationID, senderID, receiverID, content) => {
  const query = `
    INSERT INTO private_messages (messageID, conversationID, senderID, receiverID, content, createdAt)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.query(query, [messageID, conversationID, senderID, receiverID, content, new Date()]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Failed to add new message:", error);
    throw new Error("Failed to add new message");
  }
};

/**
 * Creates a new album on the database
 */
export const createAlbum = async (albumId, albumTitle, albumIdOwner) => {
  const query = `
    INSERT INTO albums (albumId, albumTitle, albumIdOwner)
    VALUES (?, ?,  ?);
  `;

  try {
    const [result] = await connection.query(query, [albumId, albumTitle, albumIdOwner]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Failed to add new album:", error);
    throw new Error("Failed to add new album");
  }
};

/**
 * Creates a new event on the database
 */
export const createEvent = async (eventID, title, desc = "", dateTime, location, eventType, createdOn, createdBy) => {
  let query = `
  INSERT INTO events (eventID, title, desc, dateTime, 
  location, eventType, createdOn, createdBy) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  let values = [eventID, title, desc, dateTime, location, eventType, createdOn, createdBy];


  try {
    const [result] = await connection.query(query, values);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new event", err);
    throw new Error("Failed to insert new event into the database");
  }
};

/**
 * Creates a new interested_user on the database
 */
export const addInterestedUser = async (userID, eventID) => {
  let query = "INSERT INTO interested_users (userID, eventID) VALUES (?, ?)";
  let values = [userID, eventID];

  try {
    const [result] = await connection.query(query, values);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error inserting new interested_users", err);
    throw new Error("Failed to insert new interested_users into the database");
  }
};

