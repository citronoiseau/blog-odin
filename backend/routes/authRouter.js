const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UsersController = require("../controllers/usersController");
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

      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      return res.json({ token, user: safeUser });
    });
  })(req, res, next);
});

authRouter.post("/sign-up", UsersController.signUp);

authRouter.post(
  "/upgrade",
  passport.authenticate("jwt", { session: false }),
  UsersController.upgradeToAuthor
);

module.exports = authRouter;
