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
export const checkUsername = async (username, userId = null) => {
  let query = "SELECT COUNT(*) as users FROM users WHERE username = ?";
  const params = [username];

  if (userId) {
    query += " AND userID != ?";
    params.push(userId);
  }

  try {
    const [results] = await connection.query(query, params);

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

export const getPosts = async (page, pageSize, userId) => {
  const query = `
    SELECT posts.*, 
           users.isPrivate, 
           albums.albumId, 
           albums.albumTitle, 
           CONCAT(albumOwners.firstName, ' ', albumOwners.middleName, ' ', albumOwners.lastName) AS albumOwnerName,
           albumOwners.userID AS albumIdOwner 
    FROM posts
    LEFT JOIN users ON posts.userID = users.userID  
    LEFT JOIN albums ON posts.albumId = albums.albumId 
    LEFT JOIN users AS albumOwners ON albums.albumIdOwner = albumOwners.userID  
    WHERE (albums.albumId IS NOT NULL OR users.isPrivate = 0) 
    ORDER BY posts.createdAt DESC 
    LIMIT ? OFFSET ?
  `;

  const offset = (page - 1) * pageSize;

  try {
    const [results] = await connection.query(query, [parseInt(pageSize), parseInt(offset)]);
    const [[countResult]] = await connection.query(
      "SELECT COUNT(*) AS total FROM posts LEFT JOIN albums ON posts.albumId = albums.albumId WHERE albums.albumId IS NOT NULL OR posts.userID IN (SELECT userID FROM users WHERE isPrivate = 0)" // Updated the join condition
    );
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
 * Check if a conversation already exists between two users
 */
export const checkIfConversationAvailable = async (senderID, receiverID) => {
  const query = `
    SELECT * 
    FROM conversation 
    WHERE (memberOne = ? AND memberTwo = ?)
       OR (memberOne = ? AND memberTwo = ?)
    LIMIT 1;
  `;

  try {
    const [result] = await connection.query(query, [senderID, receiverID, receiverID, senderID]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error checking if conversation exists:", error);
    throw new Error("Failed to check if conversation exists");
  }
};

/**
 * Get conversation messages for a specific conversation
 */
export const getConversationMessages = async (conversationID) => {
  const query = `
    SELECT 
      pm.messageID,
      pm.senderID,
      pm.receiverID,
      pm.content,
      pm.createdAt AS messageTimestamp,
      sender.firstName AS senderFirstName,
      sender.lastName AS senderLastName,
      sender.username AS senderUsername,
      sender.profile_picture AS senderProfilePicture,
      receiver.firstName AS receiverFirstName,
      receiver.lastName AS receiverLastName,
      receiver.username AS receiverUsername,
      receiver.profile_picture AS receiverProfilePicture
    FROM 
      private_messages pm
    LEFT JOIN 
      users sender ON pm.senderID = sender.userID
    LEFT JOIN 
      users receiver ON pm.receiverID = receiver.userID
    WHERE 
      pm.conversationID = ?
    ORDER BY 
      pm.createdAt ASC;
  `;

  try {
    const [messages] = await connection.query(query, [conversationID]);
    return messages || [];
  } catch (error) {
    console.error("Failed to retrieve conversation messages:", error);
    throw new Error("Failed to retrieve conversation messages");
  }
};

/**
 * Get all conversations for a certain user
 */
export const getAllUserConversations = async (userID) => {
  const query = `
    SELECT 
      c.conversationID,
      memberOne.userID AS memberOneID,
      memberOne.firstName AS memberOneFirstName,
      memberOne.lastName AS memberOneLastName,
      memberOne.username AS memberOneUsername,
      memberOne.profile_picture AS memberOneProfilePicture,
      memberTwo.userID AS memberTwoID,
      memberTwo.firstName AS memberTwoFirstName,
      memberTwo.lastName AS memberTwoLastName,
      memberTwo.username AS memberTwoUsername,
      memberTwo.profile_picture AS memberTwoProfilePicture,
      c.createdAt AS conversationCreatedAt
    FROM 
      conversation c
    LEFT JOIN 
      users memberOne ON c.memberOne = memberOne.userID
    LEFT JOIN 
      users memberTwo ON c.memberTwo = memberTwo.userID
    WHERE 
      c.memberOne = ? OR c.memberTwo = ?
    ORDER BY 
      c.createdAt DESC;
  `;

  try {
    const [conversations] = await connection.query(query, [userID, userID]);
    return conversations || [];
  } catch (error) {
    console.error("Failed to retrieve conversations:", error);
    throw new Error("Failed to retrieve conversations");
  }
};

/**
 * Get all posts and their media for a specific album
 */
export const getPostsByAlbumId = async (albumId) => {
  const query = `
    SELECT 
      p.postID,
      p.userID,
      p.caption,
      p.createdAt,
      m.mediaID,
      m.mediaType,
      m.mediaURL
    FROM 
      posts p
    LEFT JOIN 
      media m ON p.postID = m.postID
    LEFT JOIN 
      albums a ON p.albumId = a.albumId  -- Corrected join condition
    WHERE 
      a.albumId = ?  
    ORDER BY 
      p.createdAt DESC;
  `;

  try {
    const [posts] = await connection.query(query, [albumId]);
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts for album:", error);
    throw new Error("Error fetching posts for album");
  }
};

/**
 * Get album information along with user details (user ID, profile picture, username)
 */
export const getAlbumInformation = async (albumId) => {
  const query = `
    SELECT 
      a.albumId,
      a.albumTitle,
      u.userID AS userId,
      u.username,
      u.firstName,
      u.lastName,
      u.profile_picture AS profilePic
    FROM 
      albums a
    LEFT JOIN 
      users u ON a.albumIdOwner = u.userID
    WHERE 
      a.albumId = ?;
  `;

  try {
    const [result] = await connection.query(query, [albumId]);

    if (result.length === 0) {
      throw new Error("Album not found");
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching album information:", error);
    throw new Error("Failed to retrieve album information");
  }
};
