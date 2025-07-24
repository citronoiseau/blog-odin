/*
  Warnings:

  - A unique constraint covering the columns `[postId,id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comment_postId_authorId_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Comment_postId_id_key" ON "Comment"("postId", "id");
