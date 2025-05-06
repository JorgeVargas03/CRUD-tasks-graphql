// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.addOneUser);
router.post("/apiKey", authController.getApiKey);

module.exports = router;
