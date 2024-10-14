const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const checkToken = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-account", checkToken, authController.verifyAccount);
router.get(
  "/send-verification-email",
  checkToken,
  authController.sendVerificationEmail
);

module.exports = router;
