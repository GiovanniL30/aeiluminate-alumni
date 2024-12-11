import connection from "../connections.js";

/**
 * Updates user details
 */
export const updateProfileDetails = async (userId, firstName, middleName, lastName, userName, company, jobRole, bio, phoneNumber, isPrivate) => {
  const query = `
    UPDATE users 
    SET 
        firstName = ?, 
        middleName = ?, 
        lastName = ?, 
        username = ?, 
        company = ?, 
        job_role = ?, 
        bio = ?, 
        isPrivate = ?,
        phoneNumber = ?
    WHERE userID = ?`;

  try {
    const [result] = await connection.query(query, [
      firstName,
      middleName,
      lastName,
      userName,
      company,
      jobRole,
      bio,
      isPrivate,
      phoneNumber,
      userId,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Failed to update user details: " + error.message);
  }
};

/**
 * Updates user profile picture
 */
export const updateProfilePicture = async (userId, profilePicture) => {
  const query = `
    UPDATE users 
    SET profile_picture = ? 
    WHERE userID = ?`;

  try {
    const [result] = await connection.query(query, [profilePicture, userId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Failed to update profile picture: " + error.message);
  }
};

/**
 * Updates user password recovery via forget password
 */
export const changePassword = async (email, newPassword) => {
  const query = `
    UPDATE users 
    SET password = ? 
    WHERE email = ?`;

  try {
    const [result] = await connection.query(query, [newPassword, email]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Failed to change password: " + error.message);
  }
};
