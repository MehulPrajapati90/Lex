"use server";

import client from "@/lib/db";
import { currentUser } from "./auth";
import { createContentType, deleteContentType, GetContentByDocumentIdAndContentIdType, GetContentByDocumentIdType, updateContentType } from "@/types";
import { error } from "console";

export const createContent = async ({ documentId, content, contentType }: createContentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const prevContent = await client.contentBlock.findMany({
            where: {
                documentId: documentId
            },
            select: {
                id: true,
                order: true
            },
            orderBy: {
                order: "desc"
            }
        });

        const orderValue = prevContent?.[0]?.order ? Number(prevContent?.[0]?.order) + 1 : 1;

        const create = await client.contentBlock.create({
            data: {
                type: contentType,
                documentId: documentId!,
                order: orderValue,
                content: content
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                order: true,
                type: true
            }
        });

        return {
            success: true,
            message: "Content created successfully"
        }
    } catch (e) {
        console.error("Error fetching current user:", e);
        return {
            sucess: false,
            error: "failed to create content"
        }
    }
};

export const updateContent = async ({ contentId, content }: updateContentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated"
        }
    }

    try {
        const update = await client.contentBlock.update({
            where: {
                id: contentId
            },
            data: {
                content: content
            }
        });

        return {
            success: true,
            message: "Content updated successfully"
        }
    } catch (e) {
        console.error("Error updating content:", e);
        return {
            success: false,
            error: "failed to update content"
        }
    }
}

export const deleteContent = async ({ contentId }: deleteContentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const delContent = await client.contentBlock.delete({
            where: {
                id: contentId
            }
        });

        return {
            success: true,
            message: "Content deleted successfully"
        }
    } catch (e) {
        console.error("Error deleting content:", e);
        return {
            success: false,
            error: "failed to delete content"
        }
    }
};

export const getContentByDocumentId = async ({ documentId }: GetContentByDocumentIdType) => {
    const user = await currentUser();
    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const contents = await client.contentBlock.findMany({
            where: {
                documentId: documentId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                order: true,
                type: true
            },
            orderBy: {
                order: "asc"
            }
        });
        return {
            success: true,
            data: contents
        }
    } catch (e) {
        console.error("Error fetching contents:", e);
        return {
            success: false,
            error: "failed to fetch contents"
        }
    }
}

export const getContentByDocumentIdAndContentId = async ({ documentId, contentId }: GetContentByDocumentIdAndContentIdType) => {
    const user = await currentUser();
    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const contents = await client.contentBlock.findMany({
            where: {
                documentId: documentId,
                id: contentId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                order: true,
                type: true,
            },
            orderBy: {
                order: "asc"
            }
        });
        return {
            success: true,
            data: contents
        }
    } catch (e) {
        console.error("Error fetching contents:", e);
        return {
            success: false,
            error: "failed to fetch contents"
        }
    }
}