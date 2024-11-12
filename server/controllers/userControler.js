import { getUsers, removeUserAccount } from "../mysqlQueries/queries.js";

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
