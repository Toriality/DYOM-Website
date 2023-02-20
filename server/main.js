// Importing packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const cron = require("node-cron");
const setDailyPicks = require("./daily");

// Reading environement variables
// Check readme.txt to make your own .env.development variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Start server and connect to the database
const app = express();
const port = process.env.PORT;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri, () => {
  console.log("Connected to MongoDB");
});

// Pages
app.use("/api/users", require("./routes/user"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/articles", require("./routes/article"));
app.use("/api/reviews", require("./routes/review"));
app.use("/api/daily", require("./routes/dailyPicks"));

// Make uploads folder public
app.use("/", express.static(path.join(__dirname, "/uploads")));

// Cron funcs
cron.schedule(
  // (debug) "*/5 * * * * *",
  "0 0 * * *",
  () => {
    setDailyPicks();
  },
  {
    scheduled: true,
    timezone: "America/Los_Angeles",
  }
);

// Log server info
app.listen(port, () => {
  console.log(
    "Server running on port " +
      process.env.PORT +
      "\nThe NODE_ENV is " +
      process.env.NODE_ENV
  );
});
