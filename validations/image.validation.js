const Joi = require("joi");

const uploadValidation = Joi.object({
  //validating the file name to be at least 3 chars.
  title: Joi.string().min(3).required(),

  //validating the file size to be less than 2 Mb
  size: Joi.number()
    .max(2 * 1024 * 1024)
    .required(),
});

module.exports = {
  uploadValidation,
};
