import { createContent, deleteContent, getContentByDocumentId, getContentByDocumentIdAndContentId, updateContent } from "@/actions/content";
import { CreateContentType, DeleteContentType, GetContentByDocumentIdAndContentIdType, GetContentByDocumentIdType, UpdateContentType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ content, contentType, documentId }: CreateContentType) => await createContent({ content, contentType, documentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] })
        }
    })
};

export const useUpdateContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ content, contentId }: UpdateContentType) => await updateContent({ content, contentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] })
        }
    })
};

export const useDeleteContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ contentId }: DeleteContentType) => await deleteContent({ contentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] })
        }
    })
};

export const useGetAllByContentByDocId = ({ documentId }: GetContentByDocumentIdType) => {
    return useQuery({
        queryKey: ['content'],
        queryFn: async () => await getContentByDocumentId({ documentId }),
    })
};

export const useGetContentByDocumentIdAndContentId = ({ documentId, contentId }: GetContentByDocumentIdAndContentIdType) => {
    return useQuery({
        queryKey: ['content'],
        queryFn: async () => await getContentByDocumentIdAndContentId({ documentId, contentId }),
    })
};