const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io")(server);
const { Update } = require("./models/updates");
const { User } = require("./models/users");
const { Project } = require("./models/projects");
require("./routes/index")(app);
require("./db/db")();

socket.on("connection", async () => {
  const projects = await Project.find();
  const updates = await Update.find();
  socket.emit("new", projects);
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
