import connection from "../connections.js";
import { account, users } from "../appwriteconfig.js";

/**
 * Removes an account from the user table
 * @affectedDatabase = user
 * @author Giovanni Leo
 */
export const removeUserAccount = async (userId) => {
  try {
    const query = "DELETE FROM users WHERE userID = ?";
    const [result] = await connection.query(query, [userId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error Deleting user", error.message);
    throw new Error("Failed to delete user");
  }
};

/**
 * Unlike a post
 * @affectedDatabase = likes
 * @author Giovanni Leo
 */
export const unlikePost = async (postID, userID) => {
  const query = "DELETE FROM likes WHERE postID = ? AND userID = ?";

  try {
    const [result] = await connection.query(query, [postID, userID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting like", err);
    throw new Error("Failed to unlike the post in the database");
  }
};

/**
 * Unfollow a user
 * @affectedDatabase = follower
 * @author Giovanni Leo
 */
export const unfollowUser = async (followerID, followedID) => {
  const query = "DELETE FROM follows WHERE followerID = ? AND followedID = ?";

  try {
    const [result] = await connection.query(query, [followerID, followedID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error unfollowing a user", err);
    throw new Error("Failed to unfollow");
  }
};

/**
 * Remove an event in the events table
 * @affectedDatabase = events
 * @author Giovanni Leo
 */
export const removeEvent = async (eventID) => {
  const query = "DELETE FROM events WHERE eventID = ?";

  try {
    const [result] = await connection.query(query, [eventID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting like", err);
    throw new Error("Failed to unlike the post in the database");
  }
};

/**
 * Unmark an Event as Interested
 * @affectedDatabase = interested_users
 * @author Eugene Kyle Patano
 */
export const unmarkInterestedEvent = async (eventID, userID) => {
  const query = "DELETE FROM interested_users WHERE eventID = ? AND userID = ?";

  try {
    const [result] = await connection.query(query, [eventID, userID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting interested user", err);
    throw new Error("Failed to delete the interested user in the database");
  }
};

/**
 * Delete a post
 * @affectedDatabase = post
 * @author Giovanni Leo
 */
export const deletePost = async (postId) => {
  const query = "DELETE FROM posts WHERE postID = ?";

  try {
    const [result] = await connection.query(query, [postId]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting a post", err);
    throw new Error("Failed to delete the post");
  }
};

/**
 * Delete a event
 * @affectedDatabase = events
 * @author Giovanni Leo
 */

export const deleteEvent = async (eventID) => {
  const query = "DELETE FROM events WHERE eventID = ?";

  try {
    const [result] = await connection.query(query, [eventID]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting event", err);
    throw new Error("Failed to delete the event");
  }
};

/**
 * Delete a joblisting
 * @affectedDatabase = job_listing
 * @author Giovanni Leo
 */
export const deleteJobListing = async (jobid) => {
  const query = "DELETE FROM job_listing WHERE jobID = ?";

  try {
    const [result] = await connection.query(query, [jobid]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Error deleting job", err);
    throw new Error("Failed to delete the job");
  }
};
