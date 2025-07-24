const prisma = require("../../prisma/client");

class CommentService {
  async getCommentsByPost(postId) {
    return await prisma.comment.findMany({
      where: { postId: Number(postId) },
    });
  }

  async getCommentById(id) {
    return await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
  }

  async createComment(postId, userId, content) {
    return await prisma.comment.create({
      data: {
        content: content,
        post: {
          connect: { id: Number(postId) },
        },
        author: {
          connect: { id: Number(userId) },
        },
      },
    });
  }

  async updateComment(id, content) {
    return await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });
  }

  async deleteComment(commentId) {
    return await prisma.comment.delete({
      where: { id: Number(commentId) },
    });
  }
}

module.exports = new CommentService();
