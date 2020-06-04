const http = require("http");
const mongoose = require("mongoose");
config = require("config");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io")(server);
const { User } = require("./models/users");
const { Update, validate } = require("./models/updates");
const { Contact } = require("./models/contacts");
mongoose
  .connect(config.get("db"))
  .then((res) => console.log("Connnected"))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.json());
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/mail", (req, res) => {
  res.render("mail");
});
app.post("/updates", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  socket.emit("new version", req.body.version);
  const update = new Update({
    version: req.body.version,
    developer: req.body.developer,
    update: req.body.update,
  });
  await update.save();
  res.send(update);
});
socket.on("connection", async () => {
  const users = await User.find();
  const updates = await Update.find();
  socket.emit("new", users);
  socket.emit("all updates", updates);
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`App running at Port ${PORT}`);
  //   const contacts=await Contact.insertMany([
  //     {email:"justicemarkwei@gmail.com"},
  //     {email:"ransj1@yahoo.co.uk"},
  //     {email:"ranstina.yankey@gmail.com"},
  //     {email:"samafreh@hotmail.com"},
  //     {email:"jamegbor@gmail.com"},
  //     {email:"alfyopare@gmail.com"},
  //     {email:"sadickodai@gmail.com"},
  //     {email:"sadick.odai@teamalfy.com"},
  //     {email:"hjdorian@yahoo.com"},
  //     {email:"asbuilders603@gmail.com"},
  //     {email:"lee.hanbury@gingernutmedia.com"},
  //     {email:"ryan.partridge@gingernutmedia.com"},
  //     {email:"phil.warnock@gingernutmedia.com"}
  // ])
  // console.log(contacts);
});
