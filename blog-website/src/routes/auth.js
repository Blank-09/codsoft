const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const User = require("../models/User");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/", authMiddleware, (req, res) => {
  res.send({
    message: "Welcome to the authentication route",
  });
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/register.html"));
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "30d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
