const { Router } = require("express");
const PostsController = require("../controllers/postsController");
const { isAuthor } = require("../utils/checkStatus");
const passport = require("passport");
const postRouter = Router();

postRouter.get("/", PostsController.getAllPosts);

postRouter.get("/:id", PostsController.getPost);

postRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  PostsController.createPost
);

postRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  PostsController.updatePost
);

postRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  PostsController.deletePost
);

module.exports = postRouter;
