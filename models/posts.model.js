const mongoose = require("mongoose");
const { postValidation } = require("../validations/post.validation");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1000,
    },
    tags: [
      {
        type: String,
        minlength: 2,
        maxlength: 50,
        validate: {
          validator: (tags) => tags.length <= 10,
          message: "Maximum of 10 tags allowed.",
        },
      },
    ],
    imageUrl: {
      type: String, // Add a field for the image URL
    },

    // Add other fields as needed with validation rules
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  postValidation,
};
