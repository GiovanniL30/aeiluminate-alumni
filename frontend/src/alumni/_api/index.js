import { useAuthContext } from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

/**
 *
 * Get user info
 * @url baseurl/api/user
 */
export const getUserRequest = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * Request to login user
 * @url baseurl/api/login
 */
export const userLogin = async (email, password) => {
  try {
    const credentials = { email, password };

    const response = await fetch(`${baseURL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "An error occurred while creating logging in.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * Request to add a new post
 * @url baseurl/api/post
 */
export const uploadPost = async (caption, images) => {
  try {
    console.log(images);
    const formData = new FormData();
    formData.append("caption", caption);
    images.forEach((image) => formData.append("images", image.file));

    const response = await fetch(`${baseURL}/api/post`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while adding the post.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

/**
 *
 * Request to add a new aeline
 * @url baseurl/api/line
 */
export const uploadLine = async (caption) => {
  try {
    const response = await fetch(`${baseURL}/api/line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caption }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while adding the post.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
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
    console.log(error.message);
    throw new Error(error.message);
  }
};

/**
 * Request to get a comment and like count
 * @url baseurl/api/post/stats/:id
 */
export const fetchPostInformation = async (postId) => {
  try {
    const response = await fetch(`${baseURL}/api/post/stats/${postId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to like a new post
 * @url baseurl/api/post/like/:id
 */
export const likePost = async (postId) => {
  try {
    const response = await fetch(`${baseURL}/api/post/like/${postId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to unlike a new post
 * @url baseurl/api/post/unlike/:id
 */
export const unlikePost = async (postId) => {
  try {
    const response = await fetch(`${baseURL}/api/post/unlike/${postId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to unlike a new post
 * @url baseurl/api/user/follower_count/:id
 */
export const fetchFollowerCount = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/api/user/follower_count/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to follow a user
 * @url baseurl/api/user/follow/:id
 */
export const followUserRequest = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/api/user/follow/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to unfollow a user
 * @url baseurl/api/user/unfollow/:id
 */
export const unfollowUserRequest = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/api/user/unfollow/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to check following status
 * @url baseurl/api/user/unfollow/:id
 */
export const checkFollowingStatusRequest = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/api/user/follow_status/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to add a new comment
 * @url baseurl/api/post/comment/:id
 */
export const addCommentRequest = async (comment, postId) => {
  try {
    const response = await fetch(`${baseURL}/api/post/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Request to get comments of a post
 * @url baseurl/api/post/comments/:id
 */
export const getCommentsRequest = async (postId) => {
  try {
    const response = await fetch(`${baseURL}/api/post/comments/${postId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
