const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserService = require("../prisma/services/user.service");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../utils/validators");

class UsersController {
  signUp = [
    ...validateUser,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserService.createUser({
          first_name,
          last_name,
          email,
          password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully" });
      } catch (err) {
        console.error("Sign-up error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
      }
    }),
  ];

  upgradeToAuthor = asyncHandler(async (req, res) => {
    const { secretPassword } = req.body;

    if (secretPassword !== process.env.AUTHOR_SECRET) {
      return res.status(403).json({ message: "Invalid secret password" });
    }

    await UserService.upgradeUser(req.user.id);

    res.status(201).json({ message: "You have been upgraded to author!" });
  });
}

module.exports = new UsersController();
