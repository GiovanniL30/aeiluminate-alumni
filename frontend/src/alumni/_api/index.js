import { useAuthContext } from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

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

    console.log(formData);

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

    console.log("next page: ", nextPage);

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
export const fetchCommentAndLikeCount = async (postId) => {
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
