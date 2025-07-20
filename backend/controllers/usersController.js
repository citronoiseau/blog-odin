const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserService = require("../prisma/services/user.service");
const bcrypt = require("bcryptjs");

class UsersController {
  validateUser = [
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
        if (user) {
          throw new Error("Email already in use");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters"),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];

  signUp = [
    ...validateUser,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { first_name, last_name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await UserService.createUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created successfully" });
    }),
  ];

  upgradeToAuthor = asyncHandler(async (req, res) => {
    const { secretPassword } = req.body;
    const SECRET_CODE = process.env.AUTHOR_SECRET;

    if (secretPassword !== SECRET_CODE) {
      return res.status(403).json({ message: "Invalid secret password" });
    }

    await UserService.upgradeUser(req.user.id);

    res.json({ message: "You have been upgraded to author!" });
  });
}

module.exports = new UsersController();
