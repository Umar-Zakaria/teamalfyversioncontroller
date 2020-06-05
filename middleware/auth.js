const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.redirect("/register");
  try {
    const user = jwt.verify(token, config.get("key"));
    req.user = user;
    next();
  } catch (ex) {
    res.redirect("/register");
  }
};
