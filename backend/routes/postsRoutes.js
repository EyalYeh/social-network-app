const express = require("express");
const router = express.Router();
const {
  listPosts,
  createPost,
  deletePost,
  likePost,
} = require("../controllers/postController");

router.get("/", listPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);

module.exports = router;