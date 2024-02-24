require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const mainRoute = require("./routes/main");
const authRoute = require("./routes/auth");
const apiRoute = require("./routes/api");

// Connect to DB
const connectDB = require("./config/db");
connectDB();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set("view engine", "ejs");
app.set("views", "src/views");

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 },
  })
);

// Static Files
app.use(express.static("public"));

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
