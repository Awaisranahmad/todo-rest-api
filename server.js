//server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// App and setting
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - security guards
app.use(cors());
app.use(express.json());

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected Successfully!"))
  .catch((err) => console.log("Databse Error:", err.message));

// test route
app.get("/", (req, res) => {
  res.send("todo API is running on port " + PORT);
});

// todo routes (registered once — previously mounted twice)
app.use("/todos", todoRoutes);

// Centralized error handler — must come AFTER all routes so that errors
// forwarded with next(err) (e.g. from asyncHandler) reach it instead of
// Express's default HTML error page.
app.use(errorMiddleware);

// Only start listening when run directly (`node server.js`).
// Importing this file (e.g. from tests) gets the app without binding a port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
}

module.exports = app;
