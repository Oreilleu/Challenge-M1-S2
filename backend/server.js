const express = require("express");
const app = express();
const config = require("./config");
const routes = require("./routes/test");

// Middleware setup
app.use(express.json());

// Routes setup
app.use("/test", routes);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
