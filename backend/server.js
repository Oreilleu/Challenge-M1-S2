const express = require("express");
const app = express();
const config = require("./config");
const authRoutes = require("./routes/auth");
const connectDb = require("./utils/connectDb");
const errorHandler = require("./middleware/error");
var cors = require("cors");

// Function to connect database
connectDb();

// Middleware setup
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_URL || "",
  })
);

// Routes setup
app.use("/", authRoutes);

// Error server handler
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
