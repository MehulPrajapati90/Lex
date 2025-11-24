import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWorkspaceType, DeleteWorkspaceType, GetWorkspaceByIdType, UpdateWorkspaceType } from "@/types";
import { createWorkspace, deleteWorkspace, getAllWorkspace, getWorkspaceById, updateWorkspace } from "@/actions/workspace";

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name }: CreateWorkspaceType) => await createWorkspace({ name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, workspaceId }: UpdateWorkspaceType) => await updateWorkspace({ name, workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ workspaceId }: DeleteWorkspaceType) => await deleteWorkspace({ workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useGetAllWorkspace = () => {
    return useQuery({
        queryKey: ['workspace'],
        queryFn: async () => await getAllWorkspace()
    })
};

export const useGetWorkspaceById = ({ workspaceId }: GetWorkspaceByIdType) => {
    return useQuery({
        queryKey: ['workspace'],
        queryFn: async () => await getWorkspaceById({ workspaceId })
    })
};