import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { userLogin, uploadPost, uploadLine, fetchPosts } from "../index.js";

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
  return useMutation({
    mutationFn: ({ caption, images }) => uploadPost(caption, images),
  });
};

/**
 * React query to upload a new post
 */
export const useUploadLine = () => {
  return useMutation({
    mutationFn: ({ caption }) => uploadLine(caption),
  });
};

export const useGetPosts = (length) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, length }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
