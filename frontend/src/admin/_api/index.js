/**
 * Fetch all list of users
 * @url baseurl/api/users
 */
export const getUsers = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "An error occurred while fetching users.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getUsers function:", error.message || error);
    throw error;
  }
};

/**
 * Fetch all list of programs
 * @url baseurl/api/programs
 */
export const getPrograms = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/programs`);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "An error occurred while fetching programs.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * Sends a request to create a new user
 * @url baseurl/api/register/client
 */
export const createUserAccount = async (userData) => {
  console.log(userData);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "An error occurred while creating a new user.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * Sends a request to remove a  user
 * @url baseurl/api/user/delete/:id
 */
export const removeUserAccount = async (userId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};
