import {
  checkIsFollowing,
  getUser,
  getUserFollowers,
  getUserFollowing,
  getUsers,
  checkEmail,
  getApplication,
  checkUsername,
  getUserWithEmail,
  getAlumniDetails,
} from "../mysqlQueries/readQueries.js";
import { removeUserAccount, unfollowUser } from "../mysqlQueries/deleteQueries.js";
import { followUser } from "../mysqlQueries/addQueries.js";
import { updateProfileDetails, updateProfilePicture } from "../mysqlQueries/updateQueries.js";
import { storage } from "../appwriteconfig.js";
import { ID, InputFile } from "node-appwrite";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN);
};

const verifyPassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const normalizedHash = hashedPassword.replace(/^\$2y\$/, "$2b$");

    bcrypt.compare(password, normalizedHash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 *
 * login UserPosts
 *
 * @method POST
 * @route /api/login
 * @author Giovanni Leo
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email or Password is missing" });

  try {
    const emailExists = await checkEmail(email);
    if (!emailExists) return res.status(401).json({ message: "Email does not exist" });

    const checkApplication = await getApplication(email);

    if (checkApplication) {
      return res.status(409).json({
        message: `Account is currently Pending for Application, please check your email for updates about your account application (Application ID: ${checkApplication.appID})`,
      });
    }

    const loggingUser = await getUserWithEmail(email);
    const correctPassword = await verifyPassword(password, loggingUser.password);

    if (!correctPassword) return res.status(403).json({ message: "Invalid Email or password" });
    else {
      const { password, ...user } = loggingUser;

      const token = generateToken(user.userID, user.role);
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
};

/**
 *
 * Logout UserPosts
 *
 * @method DELETE
 * @route /api/logout
 * @author Giovanni Leo
 */
export const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out successfully" });
};

/**
 *  Get all users on the Database (user)
 *  @method GET
 *  @route /api/users
 * @author Giovanni Leo
 */
export const getUsersContoller = async (req, res) => {
  const { page = 1, pageSize = 5, key = "" } = req.query;

  try {
    const { users, total } = await getUsers(page, pageSize, key);

    const totalPage = Math.ceil(total / pageSize);

    res.status(200).json({
      users: users,
      totalUsers: total,
      totalPage,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users (Internal Server error)" });
  }
};

/**
 * Get a specific user from the Database (user)
 * @method GET
 * @route /api/user
 * @author Giovanni Leo
 */
export const getUserController = async (req, res) => {
  const { userId } = req;

  try {
    const user = await getUser(userId);

    if (!user) {
      return res.status(404).json({ message: "UserPosts not found" });
    }

    const { password, ...userData } = user;

    res.json({ user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch user (Internal Server Error)" });
  }
};

/**
 * Get a specific user from the Database (user)
 * @method GET
 * @route /api/user/alumni
 * @author Giovanni Leo
 */
export const getAlumniDetailsController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getAlumniDetails(id);

    if (!user) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.json({ alumniData: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch alumni (Internal Server Error)" });
  }
};

/**
 * Get a specific user from the Database (user)
 * @method GET
 * @route /api/user/:id
 * @author Giovanni Leo
 */
export const getUserWithIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ message: "UserPosts not found" });
    }

    const { password, ...userData } = user;

    res.json({ user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch user (Internal Server Error)" });
  }
};

/**
 *  Delete user on the database
 *  @method DELETE
 *  @route /api/users/delete/:id
 * @author Giovanni Leo
 */
export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await removeUserAccount(id);
    if (!removed) {
      return res.status(500).json({ message: "Failed to delete user from database" });
    }
    res.status(200).json({ message: "UserPosts deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server error (Failed to delete user)" });
  }
};

/**
 *  Get follower count of a user
 *  @method GET
 *  @route /api/user/follower_count/:id
 * @author Giovanni Leo
 */
export const userFollowerController = async (req, res) => {
  const { id } = req.params;

  try {
    const followerCount = await getUserFollowers(id);

    res.status(200).json(followerCount);
  } catch (error) {
    console.error("Error fetching follower count:", error);
    res.status(500).json({ message: "Internal Server Error (Failed to fetch follower count)" });
  }
};

/**
 *  Get following count of a user
 *  @method GET
 *  @route /api/user/following_count/:id
 * @author Giovanni Leo
 */
export const userFollowingController = async (req, res) => {
  const { id } = req.params;

  try {
    const followingCount = await getUserFollowing(id);

    res.status(200).json(followingCount);
  } catch (error) {
    console.error("Error fetching following count:", error);
    res.status(500).json({ message: "Internal Server Error (Failed to fetch following count)" });
  }
};

/**
 *  Follow a user
 *  @method POST
 *  @route /api/user/follow/:id
 * @author Giovanni Leo
 */
export const followUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const result = await followUser(userId, id);

    if (!result) throw new Error("Failed to follow");

    res.status(200).json({ message: "Followed" });
  } catch (error) {
    console.error("Error following a user:", error);
    res.status(500).json({ message: "Internal Server Error (Failed to follow)" });
  }
};

/**
 *  Unfollow a user
 *  @method POST
 *  @route /api/user/unfollow/:id
 * @author Giovanni Leo
 */
export const unFollowUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const result = await unfollowUser(userId, id);

    if (!result) throw new Error("Failed to unfollow");

    res.status(200).json({ message: "Unfollowed" });
  } catch (error) {
    console.error("Error following a user:", error);
    res.status(500).json({ message: "Internal Server Error (Failed to unfollow)" });
  }
};

/**
 *  Unfollow a user
 *  @method POST
 *  @route /api/user/follow_status/:id
 * @author Giovanni Leo
 */
export const checkIsFollowingController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const result = await checkIsFollowing(userId, id);

    res.status(200).json({ isFollowing: result });
  } catch (error) {
    console.error("Error following checking status:", error);
    res.status(500).json({ message: "Internal Server Error (Failed to check follow status)" });
  }
};

/**
 *  Update UserPosts Details
 *  @method PATCH
 *  @route /api/user/update/details
 * @author Giovanni Leo
 */
export const updateUserDetailsController = async (req, res) => {
  const { firstName, middleName, lastName, username, company, job_role, bio, phoneNumber, isPrivate } = req.body;
  const { userId } = req;

  try {
    const usernameExists = await checkUsername(username, userId);
    if (usernameExists) return res.status(400).json({ message: "Username already taken" });

    const update = await updateProfileDetails(userId, firstName, middleName, lastName, username, company, job_role, bio, phoneNumber, isPrivate);
    if (!update) return res.status(400).json({ message: "Failed to update user details" });

    res.status(200).json({ message: "Update Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 *  Update UserPosts Profile Pic
 *  @method PATCH
 *  @route /api/user/update/profile
 * @author Giovanni Leo
 */
export const updateUserProfilePictureController = async (req, res) => {
  try {
    const { userId } = req;
    // const { oldProfile } = req.body;

    // if (!oldProfile) {
    //   return res.status(400).json({ message: "Old profile URL is required." });
    // }

    // const oldFileId = getFileIdFromUrl(oldProfile);

    if (req.file) {
      //await storage.deleteFile(process.env.APP_WRITE_IMAGES_BUCKET, oldFileId);
      const result = await storage.createFile(
        process.env.APP_WRITE_IMAGES_BUCKET,
        ID.unique(),
        InputFile.fromBuffer(req.file.buffer, req.file.originalname)
      );

      const mediaURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view?project=${process.env.APP_WRITE_PROJECT_ID}&mode=admin`;
      await updateProfilePicture(userId, mediaURL);
      return res.status(200).json({
        message: "Profile updated successfully!",
      });
    } else {
      return res.status(400).json({ message: "No new image file provided." });
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Failed to update profile." });
  }
};
