const { body } = require("express-validator");
const UserService = require("../prisma/services/user.service");
const PostService = require("../prisma/services/post.service");

const validateUser = [
  body("first_name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be 2 to 30 characters"),
  body("last_name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be 2 to 30 characters"),
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (value) => {
      const user = await UserService.getUserByEmail(value);
      if (user) throw new Error("Email already in use");
      return true;
    }),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
];

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be 2 to 50 characters")
    .custom(async (value, { req }) => {
      const authorId = req.user?.id || req.body.authorId;

      if (!authorId) {
        throw new Error("Author not specified");
      }
      const exists = await PostService.getPostByTitle(authorId, value);

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

const validateComment = [
  body("content")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Content must be at least 3 characters"),
];

module.exports = { validateUser, validatePost, validateComment };
