/*
  Warnings:

  - A unique constraint covering the columns `[postId,authorId,id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_postId_authorId_id_key" ON "Comment"("postId", "authorId", "id");
