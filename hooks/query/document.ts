import { createDocument, deleteDocument, getAllDocuments, updateDocument } from "@/actions/document";
import { CreateDocumentType, DeleteDocumentType, GetAllDocumentsType, UpdateDocumentType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ title, workspaceId }: CreateDocumentType) => await createDocument({ title, workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ title, workspaceId, documentId }: UpdateDocumentType) => await updateDocument({ documentId, title, workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ workspaceId, documentId }: DeleteDocumentType) => await deleteDocument({ workspaceId, documentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useGetAllDocument = ({ workspaceId }: GetAllDocumentsType) => {
    return useQuery({
        queryKey: ['document'],
        queryFn: async () => await getAllDocuments({ workspaceId }),
    })
};