import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../index.js";

/**
 * React query to login user
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }) => userLogin(email, password),
  });
};
