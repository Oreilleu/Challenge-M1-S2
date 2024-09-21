const express = require("express");
const app = express();
const config = require("./config");
const routes = require("./routes/test");
const connectDb = require("./utils/connectDb");

// Appel de la fonction pour se connecter à la DB
connectDb();

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
