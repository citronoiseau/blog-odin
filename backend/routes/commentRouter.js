const { Router } = require("express");
const CommentsController = require("../controllers/commentsController");

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", CommentsController.getCommentsByPost);

commentRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  CommentsController.createComment
);

commentRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CommentsController.updateComment
);

commentRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CommentsController.deleteComment
);

module.exports = commentRouter;
