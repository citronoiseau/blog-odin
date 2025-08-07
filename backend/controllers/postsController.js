const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const PostService = require("../prisma/services/post.service");
const { validatePost } = require("../utils/validators");

class PostsController {
  getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostService.getAllPosts();

    res.json(posts);
  });

  getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    res.status(201).json(post);
  });

  getAuthorPosts = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const posts = await PostService.getAuthorPosts(userId);

    res.json(posts);
  });

  createPost = [
    ...validatePost,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const authorId = req.user.id;
      try {
        const { title, content, isPublished } = req.body;

        const post = await PostService.createPost({
          title,
          content,
          isPublished,
          authorId,
        });

        res.status(201).json({ message: "Post created successfully", post });
      } catch (err) {
        console.error("Post creation error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
      }
    }),
  ];

  updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, isPublished } = req.body;
    const userId = req.user.id;
    const post = await PostService.getPostById(id);

    if (!post) {
      return res.status(404).json("Post not found");
    }
    if (post.authorId !== userId) {
      return res.status(403).json("Forbidden: You do not own this post");
    }
    try {
      await PostService.updatePost({ id, title, content, isPublished });
      res.status(201).json({ message: "Post updated successfully", post });
    } catch (err) {
      console.error("Post update error:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  });

  deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    const userId = req.user.id;

    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.authorId !== userId) {
      return res.status(403).send("Forbidden: You do not own this post");
    }

    await PostService.deletePost(id);
    res.status(201).json({ message: "Post deleted successfully" });
  });
}

module.exports = new PostsController();
