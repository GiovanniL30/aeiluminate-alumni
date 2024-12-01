import {
  checkIsFollowing,
  getUser,
  getUserFollowers,
  getUserFollowing,
  getUsers,
  checkEmail,
  validateEmailAndPassword,
  getApplication,
} from "../mysqlQueries/readQueries.js";
import { removeUserAccount, unfollowUser } from "../mysqlQueries/deleteQueries.js";
import { followUser } from "../mysqlQueries/addQueries.js";
import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN, { expiresIn: "2h" });
};

/**
 *
 * login User
 *
 * @method POST
 * @route /api/login
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

    const checkUser = await validateEmailAndPassword(email, password);
    if (!checkUser) return res.status(403).json({ message: "Invalid Email or password" });
    else {
      const { password, ...user } = checkUser;

      const token = generateToken(user.userID, user.role);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.MODE === "production",
        // sameSite: "None",
      });
      res.status(200).json({ user });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
};

/**
 *
 * Logout User
 *
 * @method DELETE
 * @route /api/logout
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
 */
export const getUsersContoller = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const { users, total } = await getUsers(page, pageSize);

    const totalPages = Math.ceil(total / pageSize);

    res.json({
      results: users,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        totalRecords: total,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users (Internal Server error)" });
  }
};

/**
 * Get a specific user from the Database (user)
 * @method GET
 * @route /api/user
 */
export const getUserController = async (req, res) => {
  const { userId } = req;

  try {
    const user = await getUser(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
 * @route /api/user/:id
 */
export const getUserWithIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
 */
export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await removeUserAccount(id);
    if (!removed) {
      return res.status(500).json({ message: "Failed to delete user from database" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server error (Failed to delete user)" });
  }
};

/**
 *  Get follower count of a user
 *  @method GET
 *  @route /api/user/follower_count/:id
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
