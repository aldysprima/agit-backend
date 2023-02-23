const joi = require("joi");

module.exports.userUsernameLoginSchema = joi.object({
  user: joi.string().alphanum().required(),
  password: joi.string().required(),
});

module.exports.userEmailLoginSchema = joi.object({
  user: joi.string().email().required(),
  password: joi.string().required(),
});
