import { useMutation } from "@tanstack/react-query";
import { userLogin, uploadPost, uploadLine } from "../index.js";

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
