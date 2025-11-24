import { ContentType } from "@prisma/client";

// Workspaces
export interface createWorkspaceType {
    name: string
}

export interface updateWorkspaceType {
    name: string;
    workspaceId: string;
}

export interface deleteWorkspaceType {
    workspaceId: string;
}

export interface getWorkspaceByIdType {
    workspaceId: string;
}

// Documents
export interface createDocumentType {
    title: string;
    workspaceId: string;
}

export interface getAllDocumentsType {
    workspaceId: string;
}

export interface deleteDocumentType {
    id: string;
    workspaceId: string;
}

export interface updateDocumentType {
    documentId: string;
    workspaceId: string;
    title: string;
}

// Content
export interface createContentType {
    documentId: string;
    contentId: string;
    content: string;
    contentType: ContentType
}

export interface updateContentType {
    contentId: string;
    content: string;
}

export interface GetContentByDocumentIdAndContentIdType {
    documentId: string;
    contentId: string;
}

export interface GetContentByDocumentIdTypes {
    documentId: string;
}