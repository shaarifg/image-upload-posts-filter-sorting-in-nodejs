const Joi = require("joi");

const searchValidation = Joi.object({
  search: Joi.string().min(3).max(100).required().messages({
    "string.base": "Search query must be a string",
    "string.empty": "Search query cannot be empty",
    "string.min": "Search query must be at least {#limit} characters long",
    "string.max": "Search query cannot exceed {#limit} characters",
    "any.required": "Search query is required",
  }),
});

module.exports = {
  searchValidation,
};
