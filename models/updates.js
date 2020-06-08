const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const updatesSchema = mongoose.Schema({
  version: { type: String, required: true },
  update: { type: String, required: true },
  developer: { type: String, required: true },
  project: {
    type: mongoose.Schema({
      name: { type: String, required: true },
      owner: { type: String, required: true },
    }),
  },
});

const Update = mongoose.model("Update", updatesSchema);

function validate(body) {
  const schema = Joi.object({
    developer: Joi.string().required(),
    update: Joi.string().required(),
    version: Joi.string().required(),
  });
  return schema.validate(body);
}

module.exports.Update = Update;
module.exports.validate = validate;
