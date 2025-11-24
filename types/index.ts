import { ContentType } from "@prisma/client";

// Workspaces
export interface CreateWorkspaceType {
    name: string
}

export interface UpdateWorkspaceType {
    name: string;
    workspaceId: string;
}

export interface DeleteWorkspaceType {
    workspaceId: string;
}

export interface GetWorkspaceByIdType {
    workspaceId: string;
}

// Documents
export interface CreateDocumentType {
    title: string;
    workspaceId: string;
}

export interface GetAllDocumentsType {
    workspaceId: string;
}

export interface DeleteDocumentType {
    documentId: string;
    workspaceId: string;
}

export interface UpdateDocumentType {
    documentId: string;
    workspaceId: string;
    title: string;
}

// Content
export interface CreateContentType {
    documentId: string;
    content: string;
    contentType: ContentType
}

export interface UpdateContentType {
    contentId: string;
    content: string;
}

export interface DeleteContentType {
    contentId: string
}

export interface GetContentByDocumentIdAndContentIdType {
    documentId: string;
    contentId: string;
}

export interface GetContentByDocumentIdType {
    documentId: string;
}

// User
export interface UpdateUserType {
    name: string;
    imageUrl: string;
}