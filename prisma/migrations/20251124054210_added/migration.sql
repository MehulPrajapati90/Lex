-- CreateIndex
CREATE INDEX "ContentBlock_documentId_id_idx" ON "ContentBlock"("documentId", "id");

-- CreateIndex
CREATE INDEX "ContentBlock_documentId_idx" ON "ContentBlock"("documentId");

-- CreateIndex
CREATE INDEX "Document_workspaceId_id_idx" ON "Document"("workspaceId", "id");

-- CreateIndex
CREATE INDEX "Document_workspaceId_idx" ON "Document"("workspaceId");

-- CreateIndex
CREATE INDEX "Workspace_userId_id_idx" ON "Workspace"("userId", "id");

-- CreateIndex
CREATE INDEX "Workspace_userId_idx" ON "Workspace"("userId");
