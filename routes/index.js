const bcrypt = require("bcrypt");
const express = require("express");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
const { User, verify } = require("../models/users");
const { Update, validate } = require("../models/updates");
const validateBody = require("../middleware/validate-body");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.set("view engine", "ejs");
  app.use(
    session({
      maxAge: 24 * 60 * 60 * 1000,
      keys: ["unsecureKey"],
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use("/assets", express.static("assets"));

  app.get("/", (req, res) => {
    res.render("login");
  });

  app.get("/mail", (req, res) => {
    res.render("mail");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/updates", auth, (req, res) => {
    res.render("index");
  });

  app.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.redirect("/");
  });

  app.post("/register", validateBody(verify), async (req, res) => {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) return res.status(400).send("User already registered");

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.cookie("user", user.genAuthToken());
    res.send(user);
  });

  app.post("/login", validateBody(verify), async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).send("invalid Email or Password");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send("Invalid Email or Password");
    res.cookie("user", user.genAuthToken());
    res.send(user);
  });
  app.post("/updates", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    socket.emit("new version", req.body.version);
    mail(req.body.version, req.body.update);
    const update = new Update({
      version: req.body.version,
      developer: req.body.developer,
      update: req.body.update,
    });
    await update.save();
    res.send(update);
  });
};
