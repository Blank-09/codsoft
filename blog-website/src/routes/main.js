const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/index.html"));
});

router.get("/login", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/register", (req, res) => {
  res.redirect("/auth/register");
});

module.exports = router;
