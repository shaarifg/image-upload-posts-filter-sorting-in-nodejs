const Joi = require("joi");

const tagValidation = Joi.object({
  tags: Joi.array()
    .items(Joi.string().min(2).max(50))
    .min(1)
    .max(10)
    .required()
    .unique()
    .error(new Error("Invalid tags")),
});

module.exports = {
  tagValidation,
};
