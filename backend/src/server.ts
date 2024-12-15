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
import variationRouter from "./routes/variation";
import filterRouter from "./routes/filter";
import checkAdmin from "./middleware/checkAdmin";
import checkToken from "./middleware/auth";
import deliveryAddressRouter from "./routes/delivery-address";
import sessionCheckoutRouter from "./routes/session-checkout";
import orderRouter from "./routes/order";
const app = express();

connectDb();

app.use(
  cors({
    origin: process.env.FRONT_URL || "",
  })
);

// Middleware setup
app.use(express.json());
app.use(express.static("public"));

// Routes setup
app.use("/api/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/delivery-adress", checkToken, deliveryAddressRouter);
app.use("/api/product", checkToken, checkAdmin, productRouter);
app.use("/api/variation", variationRouter);
app.use("/api/filter", filterRouter);
app.use("/api/category", categoryRoute());
app.use("/api/checkout", checkToken, sessionCheckoutRouter);
app.use("/api/order", checkToken, orderRouter);

// Error server handler
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
