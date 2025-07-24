const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const PostService = require("../prisma/services/post.service");
const { validatePost } = require("../utils/validators");

class PostsController {
  getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostService.getAllPosts();

    res.json(posts);
  });

  createPost = [
    ...validatePost,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const authorId = res.locals.user.id;
      7;
      const { title, content, isPublished } = req.body;

      const post = await PostService.createPost({
        title,
        content,
        isPublished,
        authorId,
      });

      res.status(201).json({ message: "Post created successfully", post });
    }),
  ];

  updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    const post = await PostService.getPostById(id);

    if (!post) {
      return res.status(404).json("Post not found");
    }
    if (post.authorId !== userId) {
      return res.status(403).json("Forbidden: You do not own this post");
    }

    await PostService.updatePost(id, title, content);
    res.status(201).json({ message: "Post updated successfully", post });
  });

  deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    const userId = res.locals.user.id;

    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.userId !== userId) {
      return res.status(403).send("Forbidden: You do not own this post");
    }

    await PostService.deletePost(id);
    res.status(201).json({ message: "Post deleted successfully" });
  });
}

module.exports = new PostsController();
