const Post = require("../models/Post");

async function getPostById(id) {
  const post = await Post.findById(id)
    .populate("creator", "-password")
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "-password",
      },
    });

  return post;
}

module.exports = { getPostById };
