const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
require("dotenv").config();
require("./utils/passport");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRouter);
app.use("/posts", postRouter);
app.use("/posts/:postId/comments", commentRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`app listening on port ${PORT}!`));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
