require("dotenv").config();
const { Post, postValidation } = require("../models/posts.model");
const { searchValidation } = require("../validations/query.validation");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//method to create a post and save it db
exports.createPost = async (req, res) => {
  try {
    // Validate the request body against the Joi schema
    const { error } = postValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    // let imageUrl = null; // Initialize the imageUrl to null
    // if (req.files && req.files.image) {
    //   // Check if an image is provided
    //   const image = req.files.image;
    //   if (image.mimetype.startsWith("image/")) {
    //     // Upload the image to Cloudinary
    //     try {
    //       imageUrl = await uploadImageToCloudinary(image);
    //     } catch (uploadError) {
    //       return res.status(500).json({
    //         message: "Image upload to Cloudinary failed",
    //         error: uploadError,
    //       });
    //     }
    //   } else {
    //     return res
    //       .status(400)
    //       .json({ message: "Uploaded file is not an image" });
    //   }
    // }

    // creating new post
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    });

    // Save the post to the database
    const savedPost = await post.save();
    if (savedPost) {
      res
        .status(201)
        .json({ message: "post saved successfuly", data: savedPost });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// method to get all the posts
exports.getAllPosts = async (req, res) => {
  try {
    const query = req.query.query || "";
    const filter = {
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        // Add more fields to search as needed
      ],
    };

    const sort = req.query.sort || "createdAt";
    const sortOrder = req.query.order || "desc";

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page

    const skip = (page - 1) * limit;
    const allPosts = await Post.find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit);
    if (!allPosts || allPosts.length === 0) {
      res.status(200).json({ message: "No posts found" });
    } else {
      res.status(200).json({ message: "found posts", data: allPosts });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//search post by title or description
exports.searchPosts = async (req, res) => {
  const { error } = searchValidation.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ message: "Query Validatin error", error: error.message });
  } else {
    try {
      const searchQuery = req.query.search;
      console.log(searchQuery);

      const filter = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      };

      const allPosts = await Post.find(filter);

      if (!allPosts || allPosts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.status(200).json({ message: "Found posts", data: allPosts });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.filterPostsByTags = async (req, res) => {
  try {
    const tags = req.query.tags;

    const filter = {
      tags: { $in: tags }, // Filter posts with any of the provided tags
    };

    const allPosts = await Post.find(filter);

    if (!allPosts || allPosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found with the specified tags" });
    }

    res.status(200).json({ message: "Found posts", data: allPosts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
--method to upload an image
---I am using Cloudinary's free service to get url of uploaded document
*/
exports.uploadImageToCloudinary = async (req, res) => {
  try {
    //getting file key, which can be set to anything user wants
    let uploadedImage = null;
    for (const key in req.files) {
      if (req.files[key].mimetype.startsWith("image/")) {
        uploadedImage = req.files[key];
        break; // Exit the loop as soon as an image is found
      }
    }

    if (!uploadedImage) {
      return res
        .status(400)
        .json({ error: "file not found, select a photo to upload" });
    }

    //if file exist uploading it cloud and getting back the url
    const result = await cloudinary.uploader.upload(uploadedImage.tempFilePath);
    if (result.error) {
      console.error(result.error);
      return res.status(500).json({ error: "Image upload failed" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.url,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Image upload failed, something went wrong" });
  }
};
