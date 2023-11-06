const Joi = require("joi");

const postValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .max(50)
    .required()
    .error(
      new Error("Title is required and must be between 3 and 100 characters.")
    ),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .error(
      new Error(
        "Description is required and must be between 10 and 1000 characters."
      )
    ),
  tags: Joi.array()
    .items(Joi.string().min(2).max(20))
    .error(
      new Error(
        "Tags must be an array of strings with each tag between 2 and 50 characters."
      )
    ),
  imageUrl: Joi.string().uri(),
});

module.exports = {
  postValidation,
};
