import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.token || null;
};

/**
 * Get specific user info
 *
 * @author Giovanni Leo
 */
export const getSpecificUserRequest = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get alumni details
 *
 * @author Giovanni Leo
 */
export const getAlumniDetails = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/user/alumni/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 *
 * @author Giovanni Leo
 */
export const userLogin = async (email, password) => {
  try {
    const credentials = { email, password };
    const response = await axios.post(`${baseURL}/api/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * // Logout user
 *
 * @author Giovanni Leo
 */
export const userLogout = async () => {
  try {
    localStorage.removeItem("auth");
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Upload a post
 *
 * @author Giovanni Leo
 */
export const uploadPost = async (caption, images) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("caption", caption);
    images.forEach((image) => formData.append("images", image.file));

    const response = await axios.post(`${baseURL}/api/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Upload a line
 *
 * @author Giovanni Leo
 */
export const uploadLine = async (caption) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/line`,
      { caption },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Upload an event
 *
 * @author Giovanni Leo
 */
export const uploadEvent = async ({ location, dateTime, description, category, title, image }) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", description);
    formData.append("eventDateTime", dateTime);
    formData.append("location", location);
    formData.append("eventType", category);
    formData.append("images", image.file);

    const response = await axios.post(`${baseURL}/api/events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch posts with pagination
 *
 * @author Giovanni Leo
 */
export const fetchPosts = async ({ pageParam = 1, length = 5 }) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/posts?page=${pageParam}&length=${length}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of posts.");
    }

    const data = await response.json();
    const totalPosts = data.totalPosts;
    const totalPages = Math.ceil(totalPosts / length);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      posts: data.posts,
      nextPage,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * // Fetch user posts
 *
 * @author Giovanni Leo
 */
export const fetchUserPosts = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/posts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { posts } = response.data;
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch post information (likes, comments, etc.)
 *
 * @author Giovanni Leo
 */
export const fetchPostInformation = async (postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/post/stats/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch events with pagination
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const fetchEvents = async ({ pageParam = 1, length = 5 }) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/events?page=${pageParam}&length=${length}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of events.");
    }

    const data = await response.json();
    const totalEvents = data.totalEvents;
    const totalPages = Math.ceil(totalEvents / length);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      events: data.events,
      nextPage,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * // Fetch job listings
 *
 * @author Giovanni Leo, Jhea Jhana Prudencio
 */
export const fetchJobListing = async ({ pageParam = 1, length = 5 }) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/listings?page=${pageParam}&length=${length}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of events.");
    }

    const data = await response.json();
    const totalJobs = data.totalJobs;
    const totalPages = Math.ceil(totalJobs / length);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      jobs: data.jobs,
      nextPage,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * // Fetch user events
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const fetchUserEvents = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/events/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { events } = response.data;
    return events;
  } catch (error) {
    console.error("Error fetching user events:", error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch user events
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const fetchUserInterestedEvents = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/events/interested_events/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { events } = response.data;
    return events;
  } catch (error) {
    console.error("Error fetching user interested events:", error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch event information (interested users)
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const fetchEventInformation = async (eventId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/events/stats/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Like a post
 *
 * @author Giovanni Leo
 */
export const likePost = async (postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/post/like/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Mark an event as interested
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const markEventInterested = async (eventId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/events/interested/${eventId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Unlike a post
 *
 * @author Giovanni Leo
 */
export const unlikePost = async (postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/post/unlike/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Unmark an event as interested
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const unmarkEventInterested = async (eventId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/events/uninterested/${eventId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch followers of a user
 *
 * @author Giovanni Leo
 */
export const fetchFollower = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/user/follower/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Fetch following of a user
 *
 * @author Giovanni Leo
 */
export const fetchFollowing = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/user/following/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Follow a user
 *
 * @author Giovanni Leo
 */
export const followUserRequest = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/user/follow/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Unfollow a user
 *
 * @author Giovanni Leo
 */
export const unfollowUserRequest = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/user/unfollow/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Check following status
 *
 * @author Giovanni Leo
 */
export const checkFollowingStatusRequest = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/user/follow_status/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Add comment to post
 *
 * @author Giovanni Leo
 */
export const addCommentRequest = async (comment, postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL}/api/post/comment/${postId}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Get comments of a post
 *
 * @author Giovanni Leo
 */
export const getCommentsRequest = async (postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/post/comments/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Get list of programs
 *
 * @author Giovanni Leo
 */
export const getProgramsRequest = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/programs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * //Request to apply for a new user account
 *
 * @author Giovanni Leo
 */
export const postApplication = async ({
  email,
  roleType,
  userName,
  password,
  firstName,
  lastName,
  middleName,
  program,
  yearGraduated,
  type,
  diplomaImage,
  schoolIdImage,
}) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("roleType", roleType);
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("middleName", middleName);
    formData.append("program", program);
    formData.append("yearGraduated", yearGraduated);
    formData.append("type", type);
    formData.append("images", diplomaImage);
    formData.append("images", schoolIdImage);

    const response = await axios.post(`${baseURL}/api/apply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * //Request to update user details
 *
 * @author Giovanni Leo
 */
export const updateUserDetailsRequest = async ({ isPrivate, firstName, middleName, lastName, username, company, job_role, bio, phoneNumber }) => {
  try {
    const token = getAuthToken();
    const data = { firstName, middleName, lastName, username, company, job_role, bio, phoneNumber, isPrivate };

    // Make the PATCH request
    const response = await axios.patch(`${baseURL}/api/user/update/details`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An unexpected error occurred.");
  }
};

/**
 * //Request to update user profile
 *
 * @author Giovanni Leo
 */
export const updateUserProfileRequest = async ({ oldProfileURL, newImage }) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();

    formData.append("oldProfile", oldProfileURL);
    formData.append("image", newImage);

    const response = await axios.patch(`${baseURL}/api/user/update/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * //Request to get conversation messages
 *
 * @author Giovanni Leo
 */
export const getConversationMessagesRequest = async (receiverId) => {
  try {
    const token = getAuthToken();

    const response = await axios.get(`${baseURL}/api/conversation/messages`, {
      params: { receiverId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * //Request to get conversation list
 *
 * @author Giovanni Leo
 */
export const getConversationListRequest = async () => {
  try {
    const token = getAuthToken();

    const response = await axios.get(`${baseURL}/api/conversation/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * //Request to add new message
 *
 * @author Giovanni Leo
 */
export const addNewMessageRequest = async ({ receiverId, conversationID, content }) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${baseURL}/api/conversation/message`,
      { receiverId, conversationID, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

/**
 * // Request to create a new album
 *
 * @author Giovanni Leo
 */
export const createNewAlbum = async ({ albumTitle, images }) => {
  try {
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("albumTitle", albumTitle);

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    const response = await axios.post(`${baseURL}/api/album/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new album:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * // Request to add new image on album
 *
 * @author Giovanni Leo
 */
export const addImageOnAlbum = async ({ albumTitle, images, albumId }) => {
  try {
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("albumTitle", albumTitle);
    formData.append("albumId", albumId);

    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await axios.post(`${baseURL}/api/album/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new album:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Get album Post
 *
 * @author Giovanni Leo
 */
export const getAlbumPosts = async (albumId) => {
  try {
    const token = getAuthToken();

    const response = await axios.get(`${baseURL}/api/album/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching album posts:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Get Album Information
 *
 * @author Giovanni Leo
 */
export const getAlbumInformation = async (albumId) => {
  try {
    const token = getAuthToken();

    const response = await axios.get(`${baseURL}/api/album/information/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching album posts:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Get lists of albums
 *
 * @author Giovanni Leo
 */
export const fetchAlbums = async ({ pageParam = 1, length = 5 }) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/album/all?page=${pageParam}&length=${length}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of albums.");
    }

    const data = await response.json();
    const totalAlbums = data.totalAlbums;
    const totalPages = Math.ceil(totalAlbums / length);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      albums: data.albums,
      nextPage,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetch list of users
 *
 * @author Giovanni Leo
 */
export const fetchUsers = async ({ pageParam = 1, length = 5, key = "" }) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/users?page=${pageParam}&length=${length}&key=${key}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of users.");
    }

    const data = await response.json();
    const totalUsers = data.totalUsers;
    const totalPages = Math.ceil(totalUsers / length);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      users: data.users,
      nextPage,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * sent otp
 *
 * @author Giovanni Leo
 */
export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${baseURL}/api/recover/send-otp`, { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * verify otp
 *
 * @author Giovanni Leo
 */
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${baseURL}/api/recover/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Change password
 *
 * @author Giovanni Leo
 */
export const changePassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${baseURL}/api/recover/change-pass`, { email, newPassword });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Check interested user
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const checkUserInterested = async (eventid, userid) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/api/events/user_interested/${eventid}`, {
      params: { userid },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Add new joblisitng
 *
 * @author Giovanni Leo, Jhea Jhana Prudencio
 */
export const addNewJobListing = async ({ jobTitle, company, experienceRequired, workType, salary, description, url }) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${baseURL}/api/listings`,
      { jobTitle, company, experienceRequired, workType, salary, description, url },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Delete post
 *
 * @author Giovanni Leo
 */
export const deletePostRequest = async (postId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${baseURL}/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Delete Event
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const deleteEventRequest = async (eventId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${baseURL}/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Delete Job
 *
 * @author Giovanni Leo, Jhea Jhana Prudencio
 */
export const deleteJobRequest = async (jobId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${baseURL}/api/listings/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
