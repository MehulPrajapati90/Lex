"use server";

import { CreateDocumentType, DeleteDocumentType, GetAllDocumentsType, UpdateDocumentType } from "@/types";
import { currentUser } from "./auth";
import client from "@/lib/db";

export const createDocument = async ({ title, workspaceId }: CreateDocumentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const create = await client.document.create({
            data: {
                workspaceId: workspaceId,
                title: title
            }
        });

        return {
            success: true,
            message: "Document created successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to create document"
        }
    }
};

export const deleteDocument = async ({ documentId, workspaceId }: DeleteDocumentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const update = await client.document.delete({
            where: {
                id: documentId,
                workspaceId: workspaceId
            },
        });

        return {
            success: true,
            message: "Document deleted successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to delete documents"
        }
    }
};

export const updateDocument = async ({ documentId, workspaceId, title }: UpdateDocumentType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const update = await client.document.update({
            where: {
                id: documentId,
                workspaceId: workspaceId,
            },
            data: {
                title: title,
            }
        });

        return {
            success: true,
            message: "Document updated successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to update documents"
        }
    }
};

export const getAllDocuments = async ({ workspaceId }: GetAllDocumentsType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const get = await client.document.findMany({
            where: {
                workspaceId: workspaceId,
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                contentBlocks: {
                    select: {
                        id: true,
                        type: true,
                        content: true,
                        order: true,
                        createdAt: true,
                    },
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        });

        return {
            success: true,
            message: "Documents fetched successfully",
            documents: get,
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to fetched workspace"
        }
    }
};