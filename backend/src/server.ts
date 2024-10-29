import express from "express";
import { config } from "./config";
import cors from "cors";
import { connectDb } from "./utils/connectDb";
import { errorHandler } from "./middleware/error";

//Import routes
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import productRouter from "./routes/product";
import categoryRoute from "./routes/category";

const app = express();

connectDb();

// Middleware setup
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_URL || "",
  })
);

// Routes setup
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRoute());

// Error server handler
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
