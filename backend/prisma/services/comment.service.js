const prisma = require("../../prisma/client");

class CommentService {
  async getCommentsByPost(postId) {
    return await prisma.comment.findMany({
      where: { postId: Number(postId) },
    });
  }
  async deleteComment(postId, commentId) {
    return await prisma.comment.delete({
      where: { postId: Number(postId), id: Number(commentId) },
    });
  }
}

module.exports = new CommentService();
