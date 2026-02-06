import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users.api";

type UpdateUserInput = {
  id: number;
  data: Omit<User, "id">;
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => (await getUsers()).data,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<User, "id">) => createUser(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateUserInput) =>
      updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers =
        queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.filter((u) => u.id !== id)
      );

      return { previousUsers };
    },

    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ["users"],
          context.previousUsers
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    ...usersQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
