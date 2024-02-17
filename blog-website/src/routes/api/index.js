const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");
const User = require("../../models/User");

const { authMiddleware } = require("../auth.js");

router.use("/", require("./post.js"));

router.get("/", (req, res) => {
  res.send({
    message: "Welcome to the API route",
  });
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.userId });
    res.send({ data: posts });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
