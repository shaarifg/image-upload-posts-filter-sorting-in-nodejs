const mongoose = require("mongoose");
const { uploadValidation } = require("../validations/image.validation");
const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = {
  Image,
  uploadValidation,
};
