const { Router } = require("express");

const postRouter = Router();

postRouter.get("/", (req, res) => {
  const posts = [];
  // code to retrieve an article...
  res.json(posts);
});

postRouter.post("/", (req, res) => {
  // code to add a new article...
  res.json(req.body);
});

postRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  // code to update an article...
  res.json(req.body);
});

postRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});

module.exports = postRouter;
