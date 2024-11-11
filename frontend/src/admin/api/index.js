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

/**                         GET LIST OF AVAILABLE PROGRAMS */
export const getPrograms = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/programs`
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "An error occurred while fetching programs."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
