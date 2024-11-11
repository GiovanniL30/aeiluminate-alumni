/**                         GET LIST OF USER ACCOUNTS */
export const getUsers = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "An error occurred while fetching users."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getUsers function:", error.message || error);
    throw error;
  }
};
