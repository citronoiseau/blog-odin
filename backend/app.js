const cors = require("cors");
const express = require("express");
require("dotenv").config();
require("./utils/passport");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`app listening on port ${PORT}!`));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
