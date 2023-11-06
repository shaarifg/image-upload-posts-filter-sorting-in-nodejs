const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  searchPosts,
  uploadImage,
  filterPostsByTags,
} = require("../controllers/posts.constroller");

// home route
router.get("", (req, res) => {
  res.send("Hello Mohd Sharif, how are you?");
});

//create a post and save it the databases
router.post("/posts", createPost);

//get all the post
//this api is supporting filtering, sorting, and pagination
router.get("/posts", getAllPosts);

//posts search endpoint -- using title and description of the post
router.get("/search/posts", searchPosts);

//posts search endpoint -- using tags
router.get("/tags/posts", filterPostsByTags);

//route to upload image(documents)
router.post("/upload", uploadImage);

module.exports = router;
