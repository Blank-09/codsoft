require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
const mainRoute = require("./routes/main");
const authRoute = require("./routes/auth");
const apiRoute = require("./routes/api");

// Connect to DB
connectDB();

// Middlewares
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
