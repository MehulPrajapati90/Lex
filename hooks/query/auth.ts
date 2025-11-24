import { currentUser, updateUser } from "@/actions/auth";
import { UpdateUserType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await currentUser()
    })
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, imageUrl }: UpdateUserType) => updateUser({ name, imageUrl }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })
};