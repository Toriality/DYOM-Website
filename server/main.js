// Importing packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Reading environement variables
// Check readme.txt to make your own .env.development variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Start server and connect to the database
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri, () => {
  console.log("Connected to MongoDB");
});

// Pages
app.use("/api/user", require("./routes/user"));
app.use("/api/mission", require("./routes/mission"));
app.use("/api/article", require("./routes/article"));
app.use("/api/review", require("./routes/review"));

// Make uploads folder public
app.use("/", express.static(path.join(__dirname, "/uploads")));

// Log server info
app.listen(port, () => {
  console.log(
    "Server running on port " +
      process.env.PORT +
      "\nThe NODE_ENV is " +
      process.env.NODE_ENV
  );
});
