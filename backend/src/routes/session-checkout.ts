import express from "express";
import {
  createSession,
  getSessionStatus,
} from "../controllers/session-checkout";

const sessionCheckoutRouter = express.Router();

sessionCheckoutRouter.post("/create-checkout-session", createSession);
sessionCheckoutRouter.get("/session-status", getSessionStatus);

export default sessionCheckoutRouter;
