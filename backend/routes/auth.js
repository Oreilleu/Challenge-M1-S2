const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const checkToken = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-account", checkToken, authController.verifyAccount);

module.exports = router;
