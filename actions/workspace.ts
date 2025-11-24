"use server";

import { CreateWorkspaceType, DeleteWorkspaceType, GetWorkspaceByIdType, UpdateWorkspaceType } from "@/types";
import { currentUser } from "./auth";
import client from "@/lib/db";

export const createWorkspace = async ({ name }: CreateWorkspaceType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const create = await client.workspace.create({
            data: {
                userId: user?.id!,
                name: name!
            }
        });

        return {
            success: true,
            message: "Workspace created successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to create workspace"
        }
    }
};

export const updateWorkspace = async ({ name, workspaceId }: UpdateWorkspaceType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const update = await client.workspace.update({
            where: {
                userId: user?.id!,
                id: workspaceId,
            },
            data: {
                name: name!
            }
        });

        return {
            success: true,
            message: "Workspace updated successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to update workspace"
        }
    }
}

export const deleteWorkspace = async ({ workspaceId }: DeleteWorkspaceType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const deleteSpace = await client.workspace.delete({
            where: {
                userId: user?.id!,
                id: workspaceId,
            },
        });

        return {
            success: true,
            message: "Workspace deleted successfully"
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to delete workspace"
        }
    }
}

export const getAllWorkspace = async () => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const get = await client.workspace.findMany({
            where: {
                userId: user?.id!,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                documents: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,

                    }
                }
            }
        });

        return {
            success: true,
            message: "Workspace fetched successfully",
            workspaces: get,
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to fetched workspace"
        }
    }
};

export const getWorkspaceById = async ({ workspaceId }: GetWorkspaceByIdType) => {
    const user = await currentUser();

    if (!user) {
        return {
            sucess: false,
            error: "User UnAuthenticated"
        }
    }
    try {
        const get = await client.workspace.findFirst({
            where: {
                userId: user?.id!,
                id: workspaceId,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                documents: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,

                    }
                }
            }
        });

        return {
            success: true,
            message: "Workspace fetched successfully",
            workspace: get,
        }
    } catch (e) {
        console.error(e);
        return {
            sucess: false,
            error: "failed to fetched workspace"
        }
    }
}