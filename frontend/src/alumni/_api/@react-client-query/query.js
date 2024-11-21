import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  userLogin,
  uploadPost,
  uploadLine,
  fetchPosts,
  fetchPostInformation,
  likePost,
  unlikePost,
  fetchFollowerCount,
  followUserRequest,
  unfollowUserRequest,
  checkFollowingStatusRequest,
} from "../index.js";

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
export const useUserFollowerCount = (userId) => {
  return useQuery({
    queryKey: ["follower_count", userId],
    queryFn: () => fetchFollowerCount(userId),
  });
};

/**
 * React query to get unfollower count of a user
 */
export const useUnFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => unfollowUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower_count", userId]);
      client.invalidateQueries(["follow_status", userId]);
    },
  });
};

/**
 * React query to get follower count of a user
 */
export const useFollowUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (userId) => followUserRequest(userId),
    onSuccess: (_, userId) => {
      client.invalidateQueries(["follower_count", userId]);
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
