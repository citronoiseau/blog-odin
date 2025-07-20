const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserController = require("../controllers/userController");
const { isAuthor } = require("../utils/checkStatus");

const authRouter = Router();

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info?.message || "Login failed",
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    });
  })(req, res, next);
});

authRouter.post("/sign-up", UserController.signUp);

authRouter.get(
  "/author",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  (req, res) => {
    res.send("Welcome, Author!");
  }
);

authRouter.post(
  "/upgrade-to-author",
  passport.authenticate("jwt", { session: false }),
  UserController.upgradeToAuthor
);

module.exports = authRouter;
