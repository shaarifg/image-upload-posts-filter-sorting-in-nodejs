const Joi = require("joi");

const tagValidation = Joi.object({
  tags: Joi.array().items(Joi.string().min(2).max(50)).min(1).required(),
});

module.exports = {
  tagValidation,
};
