import { createDocument, deleteDocument, getAllDocuments, updateDocument } from "@/actions/document";
import { createDocumentType, deleteDocumentType, getAllDocumentsType, updateDocumentType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ title, workspaceId }: createDocumentType) => await createDocument({ title, workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ title, workspaceId, documentId }: updateDocumentType) => await updateDocument({ documentId, title, workspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ workspaceId, documentId }: deleteDocumentType) => await deleteDocument({ workspaceId, documentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            queryClient.invalidateQueries({ queryKey: ['workspace'] })
        }
    })
};

export const useGetAllDocument = ({ workspaceId }: getAllDocumentsType) => {
    return useQuery({
        queryKey: ['document'],
        queryFn: async () => await getAllDocuments({ workspaceId }),
    })
};