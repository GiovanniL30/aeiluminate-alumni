import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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

  const client = useQueryClient()

  return useMutation({
    mutationFn: ({ caption, images }) => uploadPost(caption, images),
    onSuccess: () => client.invalidateQueries(["posts"])
  });
};

/**
 * React query to upload a new post
 */
export const useUploadLine = () => {

  const client = useQueryClient()

  return useMutation({
    mutationFn: ({ caption }) => uploadLine(caption),
    onSuccess: () => client.invalidateQueries(["posts"])
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
