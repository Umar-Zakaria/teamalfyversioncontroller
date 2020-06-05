const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ email: this.email, name: this.name }, config.get("key"));
};

const User = mongoose.model("User", userSchema);

function validate(body) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email()
      .pattern(/^[a-zA-z.0-9]+@teamalfy.com$/)
      .required(),
    password: Joi.string().required(),
  });
  return schema.validate(body);
}

module.exports.User = User;
module.exports.verify = validate;
