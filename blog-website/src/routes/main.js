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

const slider = [
  {
    title: "ReactJs Testing",
    subtitle: "Learn how to test React components",
    createdAt: new Date(),
    image: "/assets/img/react.jpg",
  },
  {
    title: "JavaScript Basics",
    subtitle: "Learn the basics of JavaScript",
    createdAt: new Date(),
    image: "/assets/img/javascript.jpg",
  },
  {
    title: "php Basics",
    subtitle: "Learn how to build server-side applications with php",
    createdAt: new Date(),
    image: "/assets/img/code-screen.jpg",
  },
  {
    title: "CSS Flexbox Guide",
    subtitle: "Learn how to layout your web pages with CSS Flexbox",
    createdAt: new Date(),
    image: "/assets/img/keyboard.jpg",
  },
  {
    title: "HTML5 Features",
    subtitle: "Learn about the new features in HTML5",
    createdAt: new Date(),
    image: "/assets/img/html.jpg",
  },
  {
    title: "Python for Data Science",
    subtitle: "Learn how to use Python for data analysis and visualization",
    createdAt: new Date(),
    image: "/assets/img/data-science.jpg",
  },
  {
    title: "Cyber Security",
    subtitle: "Learn about cybersecurity and protecting your applications",
    createdAt: new Date(),
    image: "/assets/img/cyber-security.jpg",
  },
  {
    title: "Ruby on Rails Tutorial",
    subtitle: "Learn how to build web applications with Ruby on Rails",
    createdAt: new Date(),
    image: "/assets/img/laptop.jpg",
  },
];

router.get("/", async (req, res) => {
  const recentPosts = await Post.find({}).sort({ createdAt: "desc" }).limit(10);

  res.render("index", {
    posts: recentPosts,
    user: req.user,
    slider,
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

router.get("/search", async (req, res) => {
  const { q } = req.query;
  const posts = await Post.find({ title: { $regex: q || "", $options: "i" } });
  const recentPosts = await Post.find({}).sort({ createdAt: "desc" }).limit(10);

  res.render("search", {
    posts,
    user: req.user,
    recentPosts,
    categories,
    q,
  });
});

router.get("/profile", async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.user._id });
    const recentPosts = await Post.find({})
      .sort({ createdAt: "desc" })
      .limit(10);
    res.render("profile", {
      user: req.user,
      profile: req.user,
      posts,
      recentPosts,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const posts = await Post.find({ creator: id });
    const recentPosts = await Post.find({})
      .sort({ createdAt: "desc" })
      .limit(10);
    res.render("profile", {
      user: req.user,
      profile: user,
      posts,
      recentPosts,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
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
