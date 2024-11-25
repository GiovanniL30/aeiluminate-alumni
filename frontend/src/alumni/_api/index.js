import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

/**
 * Get user info
 * @url baseurl/api/user
 */
export const getUserRequest = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get user info
 * @url baseurl/api/user/:id
 */
export const getSpecificUserRequest = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/api/user/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Request to login user
 * @url baseurl/api/login
 */
export const userLogin = async (email, password) => {
  try {
    const credentials = { email, password };
    const response = await axios.post(`${baseURL}/api/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "An error occurred while logging in.");
  }
};

/**
 * Request to add a new post
 * @url baseurl/api/post
 */
export const uploadPost = async (caption, images) => {
  try {
    const formData = new FormData();
    formData.append("caption", caption);
    images.forEach((image) => formData.append("images", image.file));

    const response = await axios.post(`${baseURL}/api/post`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data?.message || "An error occurred while adding the post.");
  }
};

/**
 * Request to add a new line
 * @url baseurl/api/line
 */
export const uploadLine = async (caption) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/line`,
      { caption },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data?.message || "An error occurred while adding the line.");
  }
};

/**
 * Request to get a list of posts with pagination
 * @url baseurl/api/posts
 */
export const fetchPosts = async ({ pageParam = 1, length = 5 }) => {
  try {
    const response = await fetch(`${baseURL}/api/posts?page=${pageParam}&length=${length}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching lists of posts.");
    }

    const data = await response.json();

    const totalPosts = data.totatPosts;
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
 * Request to get a list of posts with pagination
 * @url baseurl/api/posts/:id
 */
export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/api/posts/${userId}`, {
      withCredentials: true,
    });

    const { posts } = response.data;
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    throw new Error(error.response?.data?.message || "An error occurred while fetching posts.");
  }
};

/**
 * Request to get comment and like count
 * @url baseurl/api/post/stats/:id
 */
export const fetchPostInformation = async (postId) => {
  try {
    const response = await axios.get(`${baseURL}/api/post/stats/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to like a post
 * @url baseurl/api/post/like/:id
 */
export const likePost = async (postId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/post/like/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to unlike a post
 * @url baseurl/api/post/unlike/:id
 */
export const unlikePost = async (postId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/post/unlike/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to get follower of a user
 * @url baseurl/api/user/follower/:id
 */
export const fetchFollower = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/api/user/follower/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to get following of a user
 * @url baseurl/api/user/followingt/:id
 */
export const fetchFollowing = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/api/user/following/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to follow a user
 * @url baseurl/api/user/follow/:id
 */
export const followUserRequest = async (userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/user/follow/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to unfollow a user
 * @url baseurl/api/user/unfollow/:id
 */
export const unfollowUserRequest = async (userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/user/unfollow/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to check following status
 * @url baseurl/api/user/follow_status/:id
 */
export const checkFollowingStatusRequest = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/api/user/follow_status/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to add a new comment
 * @url baseurl/api/post/comment/:id
 */
export const addCommentRequest = async (comment, postId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/post/comment/${postId}`,
      { comment },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

/**
 * Request to get comments of a post
 * @url baseurl/api/post/comments/:id
 */
export const getCommentsRequest = async (postId) => {
  try {
    const response = await axios.get(`${baseURL}/api/post/comments/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};
