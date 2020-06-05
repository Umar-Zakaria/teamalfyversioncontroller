const mongoose = require("mongoose");
config = require("config");
module.exports = () => {
  mongoose
    .connect(config.get("db"))
    .then((res) => console.log("Connnected"))
    .catch((err) => console.log(err));
};
