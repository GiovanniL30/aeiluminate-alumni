import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

/**
 * Validate email and password
 */
export const validateEmailAndPassword = async (email, password) => {
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  try {
    const [result] = await connection.query(query, [email, password]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Failed to check email and password:", error);
    throw new Error("Failed to validate email and password");
  }
};

/**
 * Get a specific user from the database
 */
export const getUser = async (id) => {
  const query = "SELECT * FROM users WHERE userID = ?";

  try {
    const [result] = await connection.query(query, [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw new Error("Failed to retrieve user data");
  }
};

/**
 * Get an application and user data from the database
 */
export const getApplication = async (email) => {
  const query = `
    SELECT 
      u.*, 
      a.appID 
    FROM 
      users u
    JOIN 
      application a 
    ON 
      u.userID = a.userID
    WHERE 
      u.email = ?
  `;

  try {
    const [result] = await connection.query(query, [email]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Failed to get application data:", error);
    throw new Error("Failed to retrieve application data");
  }
};

/**
 * Get a list of all programs
 */
export const getPrograms = async () => {
  const query = "SELECT * FROM academic_programs";

  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.error("Failed to get programs:", error);
    throw new Error("Failed to retrieve programs");
  }
};

/**
 * Get comment, like count, and user's like status for a specific post
 */
export const getPostStats = async (postId, userId) => {
  const query = `
    SELECT 
        p.postID, 
        u.username AS posted_by,
        u.profile_picture AS profile_link,
        COUNT(DISTINCT l.userID) AS total_likes, 
        COUNT(DISTINCT c.commentID) AS total_replies,
        MAX(CASE WHEN l.userID = ? THEN 1 ELSE 0 END) AS is_liked
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

  try {
    const [result] = await connection.query(query, [userId, postId]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Failed to get post stats:", error);
    throw new Error("Failed to get post stats");
  }
};

/**
 * Check if the username is already in the database
 */
export const checkUsername = async (username) => {
  const query = "SELECT COUNT(*) as users FROM users WHERE username = ?";

  try {
    const [results] = await connection.query(query, [username]);
    return results[0].users > 0;
  } catch (error) {
    console.error("Failed to check username:", error);
    throw new Error("Failed to check username");
  }
};

/**
 * Check if the email is already in the database
 */
export const checkEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  try {
    const [results] = await connection.query(query, [email]);
    return results.length > 0;
  } catch (error) {
    console.error("Failed to check email:", error);
    throw new Error("Failed to check email");
  }
};

/**
 * Fetch paginated users and total count from the database
 */
export const getUsers = async (page, pageSize) => {
  const query = "SELECT * FROM users LIMIT ? OFFSET ?";
  const offset = (page - 1) * pageSize;

  try {
    const [results] = await connection.query(query, [parseInt(pageSize), parseInt(offset)]);
    const [[countResult]] = await connection.query("SELECT COUNT(*) AS total FROM users");
    return { users: results, total: countResult.total };
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    throw new Error("Error fetching paginated users");
  }
};

/**
 * Fetch paginated posts and total count from the database
 */
export const getPosts = async (page, pageSize, userId) => {
  const query = "SELECT * FROM posts WHERE userID != ? LIMIT ? OFFSET ?";
  const offset = (page - 1) * pageSize;

  try {
    const [results] = await connection.query(query, [userId, parseInt(pageSize), parseInt(offset)]);
    const [[countResult]] = await connection.query("SELECT COUNT(*) AS total FROM posts");
    return { posts: results, total: countResult.total };
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    throw new Error("Error fetching paginated posts");
  }
};

/**
 * Fetch posts of a user
 */
export const getUserPosts = async (userId) => {
  const query = "SELECT * FROM posts WHERE userID = ?";

  try {
    const [results] = await connection.query(query, [userId]);
    return results.length > 0 ? results : [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Error fetching user posts");
  }
};

/**
 * Get all list of media files of a post
 */
export const getMedia = async (postId) => {
  const query = "SELECT mediaID, mediaURL, mediaType FROM media WHERE postID = ?";

  try {
    const [results] = await connection.query(query, [postId]);
    return results;
  } catch (error) {
    console.error("Failed to get media of the post:", error);
    throw new Error("Failed to get media");
  }
};

/**
 * Get the followers of a user
 */
export const getUserFollowers = async (userId) => {
  const query = `
    SELECT 
      u.userID, 
      u.username, 
      u.profile_picture, 
      u.role, 
      (SELECT COUNT(*) FROM follows WHERE followedID = u.userID) AS total_followers
    FROM follows f
    JOIN users u ON f.followerID = u.userID
    WHERE f.followedID = ?
  `;

  try {
    const [results] = await connection.query(query, [userId]);
    return results || [];
  } catch (error) {
    console.error("Failed to get followers:", error);
    throw new Error("Failed to fetch followers");
  }
};

/**
 * Get the users that a user is following
 */
export const getUserFollowing = async (userId) => {
  const query = `
    SELECT 
      u.userID, 
      u.username, 
      u.profile_picture, 
      u.role, 
      (SELECT COUNT(*) FROM follows WHERE followedID = u.userID) AS total_followers
    FROM follows f
    JOIN users u ON f.followedID = u.userID
    WHERE f.followerID = ?
  `;

  try {
    const [results] = await connection.query(query, [userId]);
    return results || [];
  } catch (error) {
    console.error("Failed to get following:", error);
    throw new Error("Failed to fetch following users");
  }
};

/**
 * Check if the user is following a user
 */
export const checkIsFollowing = async (followerID, followingID) => {
  const query = "SELECT COUNT(*) AS is_following FROM follows WHERE followerID = ? AND followedID = ?";

  try {
    const [results] = await connection.query(query, [followerID, followingID]);
    return results.length > 0 && results[0].is_following > 0;
  } catch (error) {
    console.error("Failed to check following status:", error);
    throw new Error("Failed to check following status");
  }
};

/**
 * Get comments for a specific post
 */
export const getPostComments = async (postId) => {
  const query = `
      SELECT 
        c.commentID,
        c.content AS commentContent,
        c.createdAt AS commentCreatedAt,
        u.userID,
        u.username AS userName,
        u.profile_picture AS userProfilePic
      FROM 
          comments c
      JOIN 
          users u ON c.userID = u.userID
      WHERE 
          c.postID = ?
  `;

  try {
    const [comments] = await connection.query(query, [postId]);
    return comments || [];
  } catch (error) {
    console.error("Failed to get post comments:", error);
    throw new Error("Failed to retrieve comments");
  }
};

/**
 * Check if there is already existing conversation
 */
export const checkIfConversationAvailable = async (memberOne, memberTwo) => {
  const query = `
    SELECT * 
    FROM conversation
    WHERE (memberOneID = ? AND memberTwoID = ?) 
      OR (memberOneID = ? AND memberTwoID = ?);
  `;

  try {
    const [conversations] = await connection.query(query, [memberOne, memberTwo, memberTwo, memberOne]);
    return conversations.length > 0 ? conversations[0] : null;
  } catch (error) {
    console.error("Error checking conversation:", error);
    throw new Error("Failed to check if conversation exists");
  }
};

/**
 * Get conversation details and messages
 */
export const getConversationMessages = async (conversationID) => {
  const query = `
    SELECT 
      c.conversationID,
      c.memberOneID,
      c.memberTwoID,
      u1.firstName AS memberOneFirstName,
      u1.lastName AS memberOneLastName,
      u1.username AS memberOneUsername,
      u1.profile_picture AS memberOneProfilePicture,
      u2.firstName AS memberTwoFirstName,
      u2.lastName AS memberTwoLastName,
      u2.username AS memberTwoUsername,
      u2.profile_picture AS memberTwoProfilePicture,
      pm.messageID,
      pm.senderID,
      pm.receiverID,
      pm.content,
      pm.createdAt AS messageTimestamp
    FROM 
      conversation c
    LEFT JOIN 
      users u1 ON c.memberOneID = u1.userID
    LEFT JOIN 
      users u2 ON c.memberTwoID = u2.userID
    LEFT JOIN 
      private_messages pm ON pm.conversationID = c.conversationID
    WHERE 
      c.conversationID = ?
    ORDER BY 
      pm.createdAt ASC;
  `;

  try {
    const [messages] = await connection.query(query, [conversationID]);
    return messages || null;
  } catch (error) {
    console.error("Failed to retrieve conversation messages:", error);
    throw new Error("Failed to retrieve conversation messages");
  }
};

/**
 * Get all conversations for a certain user and include the receiver's details
 */
export const getAllUserConversations = async (userID) => {
  const query = `
    SELECT 
      c.conversationID,
      c.memberOneID,
      c.memberTwoID,
      u1.firstName AS memberOneFirstName,
      u1.lastName AS memberOneLastName,
      u1.username AS memberOneUsername,
      u1.profile_picture AS memberOneProfilePicture,
      u2.firstName AS memberTwoFirstName,
      u2.lastName AS memberTwoLastName,
      u2.username AS memberTwoUsername,
      u2.profile_picture AS memberTwoProfilePicture
    FROM 
      conversation c
    LEFT JOIN 
      users u1 ON c.memberOneID = u1.userID
    LEFT JOIN 
      users u2 ON c.memberTwoID = u2.userID
    WHERE 
      c.memberOneID = ? OR c.memberTwoID = ?
    ORDER BY 
      c.conversationID ASC;
  `;

  try {
    const [conversations] = await connection.query(query, [userID, userID]);
    return conversations || null;
  } catch (error) {
    console.error("Failed to retrieve conversations:", error);
    throw new Error("Failed to retrieve conversations");
  }
};
