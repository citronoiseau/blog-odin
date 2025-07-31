const prisma = require("../../prisma/client");

class PostService {
  async getAllPosts() {
    return await prisma.post.findMany({
      where: { isPublished: true },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getPostByTitle(authorId, title) {
    return await prisma.post.findUnique({
      where: {
        authorId_title: {
          authorId,
          title,
        },
      },
    });
  }

  async getPostById(id) {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async createPost({ title, content, isPublished, authorId }) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        isPublished: isPublished,
        authorId: authorId,
      },
    });
  }

  async updatePost({ id, title, content }) {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: { title: title, content: content },
    });
  }

  async deletePost(id) {
    return await prisma.post.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PostService();
