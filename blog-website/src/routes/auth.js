const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

const User = require("../models/User");
const { route } = require("./main");

const router = express.Router();

router.get("/", (req, res) => {
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
      return res.status(400).send({
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    res.send({
      message: "Logged in",
      user,
    });
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

module.exports = router;
