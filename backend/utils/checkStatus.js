function isAuthor(req, res, next) {
  if (req.user?.role === "AUTHOR") {
    return next();
  }

  return res.status(403).json({ redirectTo: "/upgrade-to-author" });
}

module.exports = { isAuthor };
