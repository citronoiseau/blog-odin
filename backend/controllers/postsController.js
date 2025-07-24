const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const PostService = require("../prisma/services/post.service");

class PostsController {
  getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostService.getAllPosts();

    res.json(posts);
  });

  validatePost = [
    body("title")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Title must be 2 to 50 characters")
      .custom(async (value, { req }) => {
        const authorId = req.user?.id || req.body.authorId;

        if (!authorId) {
          throw new Error("Author not specified");
        }
        const exists = PostService.getPostByTitle();

        if (exists) {
          throw new Error("You already have a post with this title");
        }

        return true;
      }),
    body("content")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters"),
    body("isPublished").custom((value, { req }) => {
      if (
        value === true &&
        (!req.body.content || req.body.content.trim().length < 10)
      ) {
        throw new Error("Cannot publish a post without meaningful content");
      }
      return true;
    }),
  ];

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
