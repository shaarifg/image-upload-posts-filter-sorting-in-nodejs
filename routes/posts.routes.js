const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  searchPosts,
  uploadImageToCloudinary,
} = require("../controllers/posts.constroller");

// home route
router.get("", (req, res) => {
  res.send("Hello Mohd Sharif, how are you?");
});

//create a post and save it the databases
router.post("/posts", createPost);

//get all the post
router.get("/posts", getAllPosts);

//post search endpoint-- using title and description of the post
router.get("/search/posts", searchPosts);

//route to upload image

router.post("/upload", uploadImageToCloudinary);

module.exports = router;
