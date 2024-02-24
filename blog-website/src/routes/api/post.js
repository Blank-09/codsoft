const router = require("express").Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

const { authMiddleware } = require("../auth.js");

// Get a post by id
router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("creator", "-password")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          select: "-password",
        },
      });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting the post" });
  }
});

// Create a new post
router.post("/post/create", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, creator: req.userId });
    await post.save();
    res.redirect(`/post/${post._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating the post" });
  }
});

// Update a post by id
router.post("/post/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Check if the authenticated user is the creator of the post
    if (post.creator.toString() !== req.userId) {
      return res.status(403).send({ message: "Forbidden" });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.redirect(`/post/${post._id}`);
  } catch (error) {
    res.status(500).send({ message: "Error updating the post" });
  }
});

// Delete a post by id
router.delete("/post/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Check if the authenticated user is the creator of the post
    if (post.creator.toString() !== req.userId) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting the post" });
  }
});

// Get the posts created by a user
router.get("/user/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id });
    res.send({ posts });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get the latest 10 posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "creator",
        select: "-password",
      })
      .select("-comments")
      .sort({ createdAt: -1 })
      .limit(10);
    res.send({ posts });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Add a comment to a post
router.post("/posts/:postId/comment", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment: text } = req.body;

    // Create a new comment
    const comment = new Comment({ text, creator: req.userId });
    await comment.save();

    // Find the post and add the comment's id to the comments array
    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    res.redirect(`/post/${postId}`);
    // res.send({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
