import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  userLogin,
  uploadPost,
  uploadLine,
  fetchPosts,
  fetchPostInformation,
  likePost,
  unlikePost,
  followUserRequest,
  unfollowUserRequest,
  checkFollowingStatusRequest,
  addCommentRequest,
  getCommentsRequest,
  getUserRequest,
  fetchFollower,
  fetchFollowing,
  fetchUserPosts,
  getSpecificUserRequest,
} from "../index.js";

/**
 * React query to get user info
 */
export const useUser = () => {
  return useQuery({
    queryFn: () => getUserRequest(),
    queryKey: ["user"],
  });
};

/**
 * React query to get user info
 */
export const useGetUser = (id) => {
  return useQuery({
    queryFn: () => getSpecificUserRequest(id),
    queryKey: ["user", id],
  });
};

/**
 * React query to login user
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }) => userLogin(email, password),
  });
};

/**
 * React query to upload a new post
 */
export const useUploadPost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ caption, images }) => uploadPost(caption, images),
    onSuccess: () => client.invalidateQueries(["posts"]),
  });
};

/**
 * React query to upload a new post
 */
export const useUploadLine = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ caption }) => uploadLine(caption),
    onSuccess: () => client.invalidateQueries(["posts"]),
  });
};

/**
 * React query to handle loading of posts
 */
export const useGetPosts = (length) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

/**
 * React query to handle loading of posts
 */
export const useGetUserPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });
};

/**
 * React query to get post comment and like count
 */
export const usePostInformation = (postId) => {
  return useQuery({
    queryKey: ["post_comment_like_count", postId],
    queryFn: () => fetchPostInformation(postId),
  });
};

/**
 * React query to like a post
 */
export const useLikePost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (postId) => likePost(postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comment_like_count", postId]),
  });
};

/**
 * React query to unlike a post
 */
export const useUnlikePost = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (postId) => unlikePost(postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comment_like_count", postId]),
  });
};

/**
 * React query to get follower count of a user
 */
export const useUserFollower = (userId) => {
  return useQuery({
    queryKey: ["follower", userId],
    queryFn: () => fetchFollower(userId),
  });
};

/**
 * React query to get following count of a user
 */
export const useUserFollowing = (userId) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => fetchFollowing(userId),
  });
};

/**
 * React query to unfollow a user
 */
export const useUnFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => unfollowUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower", userId]);
      client.invalidateQueries(["follow_status", userId]);
    },
  });
};

/**
 * React query to follow  a user
 */
export const useFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => followUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower", userId]);
      client.invalidateQueries(["follow_status", userId]);
    },
  });
};

/**
 * React query to check if user is following a the user
 */
export const useIsFollowing = (userId) => {
  return useQuery({
    queryFn: () => checkFollowingStatusRequest(userId),
    queryKey: ["follow_status", userId],
  });
};

/**
 * React query to add a new comment
 */
export const useAddComment = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ content, postId }) => addCommentRequest(content, postId),
    onSuccess: (_, postId) => client.invalidateQueries(["post_comments", postId]),
  });
};

/**
 * React query to get comments
 */
export const useComments = (postId) => {
  return useQuery({
    queryFn: () => getCommentsRequest(postId),
    queryKey: ["post_comments", postId],
  });
};
