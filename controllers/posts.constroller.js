require("dotenv").config();
const { Image, uploadValidation } = require("../models/image.model");
const { Post, postValidation } = require("../models/posts.model");
const { searchValidation } = require("../validations/query.validation");
const { tagValidation } = require("../validations/tags.validation");

const cloudinary = require("cloudinary").v2;

//setting cloudniary configuration
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

/* method to get all the posts
--this method is supporting filtering, sorting, and pagination
*/
exports.getAllPosts = async (req, res) => {
  try {
    //filter with title
    const query = req.query.filter || "";
    const filter = {
      $or: [{ title: { $regex: new RegExp(query, "i") } }],
    };

    const sort = req.query.sort || "created_at";
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
      const dataLength = allPosts.length;
      res
        .status(200)
        .json({ message: `Found ${dataLength} post(s)`, data: allPosts });
    }
  } catch (error) {
    console.log(error);
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

      //getting length of allPost Array
      const dataLength = allPosts.length;

      res
        .status(200)
        .json({ message: `Found ${dataLength} post(s)`, data: allPosts });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

//controller to filter the posts by tags
exports.filterPostsByTags = async (req, res) => {
  const { error } = tagValidation.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Tags Validatin error", error: error.message });
  }
  try {
    const tags = req.body.tags;

    const filter = {
      tags: { $in: tags }, // Filter posts with any of the provided tags
    };

    const allPosts = await Post.find(filter);

    if (!allPosts || allPosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found with the specified tags" });
    }
    const dataLength = allPosts.length;
    res
      .status(200)
      .json({ message: `Found ${dataLength} post(s)`, data: allPosts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
--method to upload an image
---I am using Cloudinary's free service to get url of uploaded document
*/
exports.uploadImage = async (req, res) => {
  try {
    //getting file key, which can be set to anything user wants
    let uploadedImage = null;
    let imageName = null;
    for (const key in req.files) {
      if (req.files[key].mimetype.startsWith("image/")) {
        uploadedImage = req.files[key];
        imageName = uploadedImage.name;
        break; // Exit the loop as soon as an image is found
      }
    }

    if (!uploadedImage) {
      return res
        .status(400)
        .json({ error: "file not found, select a photo to upload" });
    }

    //if file exist then only uploading it cloud and getting back the url to save it database
    const result = await cloudinary.uploader.upload(uploadedImage.tempFilePath);
    //error handling for upload operations
    if (result.error) {
      console.error(result.error);
      return res.status(500).json({ error: "Image upload failed" });
    }

    const fileType = uploadedImage.mimetype;
    const fileSize = uploadedImage.size;
    //saving the image details into the images collexction
    const image = new Image({
      title: imageName,
      imageUrl: result.url,
      fileType: fileType,
      size: fileSize,
    });

    // Validationg the image
    const { error } = uploadValidation.validate({
      title: imageName,
      size: fileSize,
    });

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        message: error.details[0].message,
      });
    }
    const savedImage = await image.save();
    res.status(200).json({
      message: "Image uploaded successfully and url saved to database",
      data: savedImage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Image upload failed, something went wrong" });
  }
};
