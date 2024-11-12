import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeUserAccount, getUsers } from "../index.js";

/**
 * React Query function to delete a user
 */
export const useDeleteUserQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      alert("Deleted User");
    },
    onError: (error) => {
      alert(error);
    },
  });
};

/**
 * React Query function to get list of users
 */
export const useUsersQuery = (page, pageSize) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(`${import.meta.env.VITE_API_BASE_URL}/api/users?page=${page}&pageSize=${pageSize}`),
  });
};
