const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const CommentService = require("../prisma/services/comment.service");
const { validateComment } = require("../utils/validators");

class CommentsController {
  getCommentsByPost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const comments = await CommentService.getCommentsByPost(postId);

    res.json(comments);
  });

  createComment = [
    ...validateComment,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const postId = req.params.postId;
      const post = await PostService.getPostById(postId);

      if (!post) {
        return res.status(404).json("Post not found");
      }

      const userId = res.locals.user.id;
      try {
        const { content } = req.body;

        const comment = await CommentService.createComment({
          postId,
          userId,
          content,
        });

        res
          .status(201)
          .json({ message: "Comment posted successfully", comment });
      } catch (err) {
        console.error("Comment creation error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
      }
    }),
  ];

  updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = res.locals.user.id;
    const postId = req.params.postId;

    const post = await PostService.getPostById(postId);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    const comment = await CommentService.getCommentById(id);
    if (!comment) return res.status(404).json("Comment not found");
    if (comment.authorId !== userId)
      return res.status(403).json("Forbidden: You do not own this comment");
    try {
      await CommentService.updateComment({ id, content });
      res
        .status(200)
        .json({ message: "Comment updated successfully", comment });
    } catch (err) {
      console.error("Comment update error:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  });

  deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.user.id;
    const postId = req.params.postId;
    const post = await PostService.getPostById(postId);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    const comment = await CommentService.getCommentById(id);
    if (!comment) return res.status(404).send("Comment not found");
    if (comment.authorId !== userId)
      return res.status(403).send("Forbidden: You do not own this comment");

    await CommentService.deleteComment(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  });
}

module.exports = new CommentsController();
