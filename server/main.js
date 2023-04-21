const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const useRoutes = require("./routes");
const path = require("path");

// Reading environnement variables
// Check readme.txt to make your own .env.development variables
require("dotenv").config({ path: `./config/.env.${process.env.NODE_ENV}` });

// Start server and connect to the database
const app = express();
const port = process.env.PORT;
const uri = process.env.DATABASE_URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery", false);
mongoose.connect(uri, () => {
  console.log(`Connected to ${uri}`);
});

// Routes
app.use("/", express.static(path.join(__dirname, "/public")));
useRoutes(app);

// Log server info
app.listen(port, () => {
  console.log(`Server running on port ${port} in mode ${process.env.NODE_ENV}`);
});
