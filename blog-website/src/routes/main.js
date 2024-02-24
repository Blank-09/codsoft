const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require("../models/Post");
const { getPostById } = require("../utils/posts");

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

// Auth Middleware
router.use(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

const posts = [
  {
    title: "Post 1",
    content: "This is the first post",
    createdAt: new Date(),
    image: "https://via.placeholder.com/150x100",
    author: {
      username: "user1",
    },
  },
  {
    title: "Post 2",
    content: "This is the first post",
    createdAt: new Date(),
    image: "https://via.placeholder.com/150x100",
    author: {
      username: "user1",
    },
  },
  {
    title: "Post 3",
    content: "This is the first post",
    createdAt: new Date(),
    image: "https://via.placeholder.com/150x100",
    author: {
      username: "user1",
    },
  },
];

const categories = [
  {
    name: "Technology",
    posts: 10,
  },
  {
    name: "Web Development",
    posts: 20,
  },
  {
    name: "Food & Travels",
    posts: 15,
  },
];

router.get("/", async (req, res) => {
  const recentPosts = await Post.find({}).sort({ createdAt: "desc" }).limit(10);

  res.render("index", {
    posts,
    user: req.user,
    recentPosts,
    categories,
  });
});

router.get("/login", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/logout", (req, res) => {
  res.redirect("/auth/logout");
});

router.get("/register", (req, res) => {
  res.redirect("/auth/register");
});

router.get("/post/create", (req, res) => {
  res.render("post/create", { user: req.user });
});

router.get("/post/edit/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPostById(id);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  const recentPosts = await Post.find({}).sort({ createdAt: "desc" }).limit(10);

  res.render("post/edit", { post, user: req.user, recentPosts, categories });
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPostById(id);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  const recentPosts = await Post.find({}).sort({ createdAt: "desc" }).limit(10);

  res.render("post", { post, user: req.user, recentPosts, categories });
});

module.exports = router;
