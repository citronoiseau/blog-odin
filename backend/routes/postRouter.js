const { Router } = require("express");
const PostsController = require("../controllers/postsController");
const postsController = require("../controllers/postsController");
const { isAuthor } = require("../utils/checkStatus");
const postRouter = Router();

postRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  PostsController.getAllPosts
);

postRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  postsController.createPost
);

postRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  postsController.updatePost
);

postRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});

module.exports = postRouter;
