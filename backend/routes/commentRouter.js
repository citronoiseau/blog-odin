const { Router } = require("express");

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", (req, res) => {
  const postId = req.params.postId;
  // fetch comments for postId
  res.json([]); // replace with actual comments
});

commentRouter.post("/", (req, res) => {
  const postId = req.params.postId;
  const commentData = req.body;
  // add comment to postId
  res.json(commentData); // replace with saved comment
});

commentRouter.put("/:id", (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const updatedData = req.body;
  // update comment with commentId on postId
  res.json(updatedData); // replace with updated comment
});

commentRouter.delete("/:id", (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  // delete comment with commentId on postId
  res.json({ deleted: commentId });
});

module.exports = commentRouter;
